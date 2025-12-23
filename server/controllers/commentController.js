const Comment = require('../models/Comment');
const Skill = require('../models/Skill');
const mongoose = require('mongoose');

exports.postComment = async (req, res, next) => {
  try {
    const skillId = req.params.id;
    const { text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(skillId)) return res.status(400).json({ success: false, error: 'Invalid skill id' });
    if (!text) return res.status(400).json({ success: false, error: 'Text is required' });

    const skill = await Skill.findById(skillId);
    if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });

    const comment = await Comment.create({ skillId, userId: req.user._id, text });
    const populated = await Comment.findById(comment._id).populate('userId', 'name email avatar');

    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
};

exports.getCommentsForSkill = async (req, res, next) => {
  try {
    const skillId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(skillId)) return res.status(400).json({ success: false, error: 'Invalid skill id' });

    const comments = await Comment.find({ skillId })
      .populate('userId', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, error: 'Invalid comment id' });

    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ success: false, error: 'Comment not found' });

    const skill = await Skill.findById(comment.skillId);
    if (!skill) return res.status(404).json({ success: false, error: 'Skill not found' });

    const isCommentOwner = comment.userId.toString() === req.user._id.toString();
    const isSkillOwner = skill.userId.toString() === req.user._id.toString();

    if (!isCommentOwner && !isSkillOwner) return res.status(403).json({ success: false, error: 'Not authorized' });

    await comment.remove();
    res.json({ success: true, data: { message: 'Comment deleted' } });
  } catch (err) {
    next(err);
  }
};
