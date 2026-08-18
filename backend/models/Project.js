const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: { type: String, default: "" },
  technologies: [{ type: String }],
  imageUrl: { type: String, default: "" },
  githubUrl: { type: String, default: "" },
  liveUrl: { type: String, default: "" },
  category: { type: String, default: "AI / ML" },
  featured: { type: Boolean, default: false },
  date: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
