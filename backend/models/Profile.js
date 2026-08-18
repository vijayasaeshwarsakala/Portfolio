const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  fullName: { type: String, default: "SAKALA Vijaya Saeshwar" },
  brandingName: { type: String, default: "SAKALA" },
  subtitleName: { type: String, default: "Vijaya Saeshwar" },
  heroLabel: { type: String, default: "YOUR FRIENDLY NEIGHBORHOOD DEVELOPER" },
  title: { type: String, default: "AI & ML ENTHUSIAST" },
  tagline: { type: String, default: "Building intelligent systems & futuristic digital experiences" },
  bio: { type: String, default: "" },
  college: { type: String, default: "Pragati Engineering College" },
  degree: { type: String, default: "B.Tech" },
  branch: { type: String, default: "Computer Science Engineering" },
  specialization: { type: String, default: "Artificial Intelligence & Machine Learning" },
  displayDegree: { type: String, default: "B.Tech — CSE (AI & ML)" },
  email: { type: String, default: "vijayasaeshwarsakala@gmail.com" },
  profilePhoto: { type: String, default: "/user-data/profile-photo/profile.jpg" },
  location: { type: String, default: "Kakinada, Andhra Pradesh, India" },
  status: { type: String, default: "Open to AI/ML & Web Development Opportunities" }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
