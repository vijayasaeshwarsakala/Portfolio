const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema({
  email: { type: String, default: "vijayasaeshwarsakala@gmail.com" },
  githubUrl: { type: String, default: "" },
  linkedinUrl: { type: String, default: "" },
  instagramUrl: { type: String, default: "" },
  portfolioUrl: { type: String, default: "https://sakala-portfolio.vercel.app" },
  otherLinks: [{ label: String, url: String }]
}, { timestamps: true });

module.exports = mongoose.model('Social', socialSchema);
