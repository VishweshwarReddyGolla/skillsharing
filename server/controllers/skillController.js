const Skill = require('../models/Skill');
const mongoose = require('mongoose');

// Helper to build filters
const buildFilters = (query) => {
  const filters = {};
  if (query.category) filters.category = query.category;
  if (query.level) filters.level = query.level;
  if (query.userId) filters.userId = query.userId;
  if (query.query) {
    const q = query.query;
    filters.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
    ];
  }
  return filters;
};

exports.createSkill = async (req, res, next) => {
  try {
    const { title, description, category, level, images, timelineItems } = req.body;
    if (!title) return res.status(400).json({ success: false, error: 'Title is required' });

    const skill = await Skill.create({
      userId: req.user._id,
      title,
      description,
      category,
      level,
      images: images || [],
      timelineItems: timelineItems || [],
    });

    const populated = await Skill.findById(skill._id).populate('userId', 'name email avatar');

    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
};

exports.getSkills = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;

    const filters = buildFilters(req.query);

    const total = await Skill.countDocuments(filters);
    const skills = await Skill.find(filters)
      .populate('userId', 'name email avatar')
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({
      success: true,
      data: skills,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getSkillById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, error: 'Invalid skill id' });

    const skill = await Skill.findById(id).populate('userId', 'name email avatar');
    if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });

    res.json({ success: true, data: skill });
  } catch (err) {
    next(err);
  }
};

exports.updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, error: 'Invalid skill id' });

    const skill = await Skill.findById(id);
    if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });

    if (skill.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    const allowed = ['title', 'description', 'category', 'level', 'images', 'timelineItems', 'rating'];
    allowed.forEach((key) => {
      if (key in req.body) skill[key] = req.body[key];
    });

    await skill.save();

    const populated = await Skill.findById(skill._id).populate('userId', 'name email avatar');
    res.json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
};

exports.deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, error: 'Invalid skill id' });

    const skill = await Skill.findById(id);
    if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });

    if (skill.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    await skill.remove();
    res.json({ success: true, data: { message: 'Skill deleted' } });
  } catch (err) {
    next(err);
  }
};

exports.searchSkills = async (req, res, next) => {
  try {
    // Uses same logic as getSkills but forces text query
    req.query.query = req.query.query || '';
    return exports.getSkills(req, res, next);
  } catch (err) {
    next(err);
  }
};

exports.filterSkills = async (req, res, next) => {
  try {
    return exports.getSkills(req, res, next);
  } catch (err) {
    next(err);
  }
};

exports.sortSkills = async (req, res, next) => {
  try {
    // Accepts by=rating or by=createdAt
    req.query.sortBy = req.query.by || 'rating';
    return exports.getSkills(req, res, next);
  } catch (err) {
    next(err);
  }
};

exports.getUserSkills = async (req, res, next) => {
  try {
    const userId = req.params.id;
    req.query.userId = userId;
    return exports.getSkills(req, res, next);
  } catch (err) {
    next(err);
  }
};
