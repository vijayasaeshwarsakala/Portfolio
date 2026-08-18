const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true, default: "Pragati Engineering College" },
  degree: { type: String, required: true, default: "B.Tech" },
  branch: { type: String, required: true, default: "Computer Science Engineering" },
  specialization: { type: String, required: true, default: "Artificial Intelligence & Machine Learning" },
  displayTitle: { type: String, default: "B.Tech — CSE (AI & ML)" },
  description: { type: String, default: "" },
  cgpa: { type: String, default: "" }, // Left empty until user provides
  graduationYear: { type: String, default: "" }, // Left empty until user provides
  isCurrent: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
