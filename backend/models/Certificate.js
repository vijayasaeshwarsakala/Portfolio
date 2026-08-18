const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  issueDate: { type: String, default: "" },
  category: { type: String, default: "General" },
  description: { type: String, default: "" },
  credentialId: { type: String, default: "" },
  credentialUrl: { type: String, default: "" },
  filePath: { type: String, default: "" },
  verified: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
