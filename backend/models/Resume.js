const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  title: { type: String, default: "SAKALA_Vijaya_Saeshwar_Resume.pdf" },
  filePath: { type: String, required: true },
  fileSize: { type: Number, default: 0 },
  uploadedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
