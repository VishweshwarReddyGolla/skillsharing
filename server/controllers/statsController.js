const Skill = require('../models/Skill');

exports.getSkillStats = async (req, res, next) => {
  try {
    const total = await Skill.countDocuments();

    const byCategory = await Skill.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { category: '$_id', count: 1, _id: 0 } },
    ]);

    const avgRatingResult = await Skill.aggregate([{ $group: { _id: null, avgRating: { $avg: '$rating' } } }]);
    const avgRating = avgRatingResult[0] ? avgRatingResult[0].avgRating : 0;

    const topSkills = await Skill.find().sort({ rating: -1 }).limit(5).populate('userId', 'name avatar');

    res.json({ success: true, data: { total, byCategory, avgRating, topSkills } });
  } catch (err) {
    next(err);
  }
};
