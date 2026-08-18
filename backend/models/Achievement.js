const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, default: "" },
  date: { type: String, default: "" },
  category: { type: String, default: "General" },
  description: { type: String, default: "" },
  highlight: { type: String, default: "" },
  icon: { type: String, default: "Award" }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
