const mongoose = require('mongoose');

const timelineItemSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  date: { type: Date },
});

const skillSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: String, index: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner', index: true },
    rating: { type: Number, default: 0 },
    images: [{ type: String }],
    timelineItems: [timelineItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
