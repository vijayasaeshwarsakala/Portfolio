const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, default: "" },
  offerDate: { type: String, default: "" },
  status: { type: String, default: "INTERNSHIP / OFFER" },
  type: { type: String, default: "Internship" },
  location: { type: String, default: "" },
  responsibilities: [{ type: String }],
  verified: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
