const Profile = require('../models/Profile');
const Education = require('../models/Education');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const Experience = require('../models/Experience');
const Achievement = require('../models/Achievement');
const Resume = require('../models/Resume');
const Contact = require('../models/Contact');
const Social = require('../models/Social');

const { getIsConnected } = require('../config/db');
const jsonDb = require('../utils/jsonDb');

// --- PROFILE ---
exports.getProfile = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.json({ success: true, data: jsonDb.getProfile() });
    }
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();
    res.json({ success: true, data: profile });
  } catch (err) {
    res.json({ success: true, data: jsonDb.getProfile() });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (!getIsConnected()) {
      const updated = jsonDb.updateProfile(req.body);
      return res.json({ success: true, data: updated });
    }
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    await profile.save();
    res.json({ success: true, data: profile });
  } catch (err) {
    const updated = jsonDb.updateProfile(req.body);
    res.json({ success: true, data: updated });
  }
};

// --- EDUCATION ---
exports.getEducation = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.json({ success: true, data: jsonDb.getEducation() });
    }
    const list = await Education.find();
    res.json({ success: true, data: list });
  } catch (err) {
    res.json({ success: true, data: jsonDb.getEducation() });
  }
};

exports.createEducation = async (req, res) => {
  try {
    if (!getIsConnected()) {
      const item = jsonDb.createEducation(req.body);
      return res.status(201).json({ success: true, data: item });
    }
    const item = await Education.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    const item = jsonDb.createEducation(req.body);
    res.status(201).json({ success: true, data: item });
  }
};

exports.updateEducation = async (req, res) => {
  try {
    if (!getIsConnected()) {
      const item = jsonDb.updateEducation(req.params.id, req.body);
      return res.json({ success: true, data: item });
    }
    const item = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  } catch (err) {
    const item = jsonDb.updateEducation(req.params.id, req.body);
    res.json({ success: true, data: item });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    if (!getIsConnected()) {
      jsonDb.deleteEducation(req.params.id);
      return res.json({ success: true, message: 'Deleted successfully' });
    }
    await Education.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    jsonDb.deleteEducation(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  }
};

// --- SKILLS ---
exports.getSkills = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.json({ success: true, data: jsonDb.getSkills() });
    }
    const list = await Skill.find();
    res.json({ success: true, data: list });
  } catch (err) {
    res.json({ success: true, data: jsonDb.getSkills() });
  }
};

exports.createSkill = async (req, res) => {
  try {
    if (!getIsConnected()) {
      const item = jsonDb.createSkill(req.body);
      return res.status(201).json({ success: true, data: item });
    }
    const item = await Skill.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    const item = jsonDb.createSkill(req.body);
    res.status(201).json({ success: true, data: item });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    if (!getIsConnected()) {
      const item = jsonDb.updateSkill(req.params.id, req.body);
      return res.json({ success: true, data: item });
    }
    const item = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  } catch (err) {
    const item = jsonDb.updateSkill(req.params.id, req.body);
    res.json({ success: true, data: item });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    if (!getIsConnected()) {
      jsonDb.deleteSkill(req.params.id);
      return res.json({ success: true, message: 'Deleted successfully' });
    }
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    jsonDb.deleteSkill(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  }
};

// --- PROJECTS ---
exports.getProjects = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.json({ success: true, data: jsonDb.getProjects() });
    }
    const list = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  } catch (err) {
    res.json({ success: true, data: jsonDb.getProjects() });
  }
};

exports.createProject = async (req, res) => {
  try {
    if (!getIsConnected()) {
      const item = jsonDb.createProject(req.body);
      return res.status(201).json({ success: true, data: item });
    }
    const item = await Project.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    const item = jsonDb.createProject(req.body);
    res.status(201).json({ success: true, data: item });
  }
};

exports.updateProject = async (req, res) => {
  try {
    if (!getIsConnected()) {
      const item = jsonDb.updateProject(req.params.id, req.body);
      return res.json({ success: true, data: item });
    }
    const item = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: item });
  } catch (err) {
    const item = jsonDb.updateProject(req.params.id, req.body);
    res.json({ success: true, data: item });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    if (!getIsConnected()) {
      jsonDb.deleteProject(req.params.id);
      return res.json({ success: true, message: 'Deleted successfully' });
    }
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    jsonDb.deleteProject(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  }
};

// --- CERTIFICATES ---
exports.getCertificates = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.json({ success: true, data: jsonDb.getCertificates() });
    }
    const list = await Certificate.find();
    res.json({ success: true, data: list });
  } catch (err) {
    res.json({ success: true, data: jsonDb.getCertificates() });
  }
};

exports.createCertificate = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.filePath = `/user-data/certificates/${req.file.filename}`;
    }
    if (!getIsConnected()) {
      const item = jsonDb.createCertificate(data);
      return res.status(201).json({ success: true, data: item });
    }
    const item = await Certificate.create(data);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    const data = req.body;
    if (req.file) {
      data.filePath = `/user-data/certificates/${req.file.filename}`;
    }
    const item = jsonDb.createCertificate(data);
    res.status(201).json({ success: true, data: item });
  }
};

exports.updateCertificate = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.filePath = `/user-data/certificates/${req.file.filename}`;
    }
    if (!getIsConnected()) {
      const item = jsonDb.updateCertificate(req.params.id, data);
      return res.json({ success: true, data: item });
    }
    const item = await Certificate.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ success: true, data: item });
  } catch (err) {
    const data = req.body;
    if (req.file) {
      data.filePath = `/user-data/certificates/${req.file.filename}`;
    }
    const item = jsonDb.updateCertificate(req.params.id, data);
    res.json({ success: true, data: item });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    if (!getIsConnected()) {
      jsonDb.deleteCertificate(req.params.id);
      return res.json({ success: true, message: 'Deleted successfully' });
    }
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    jsonDb.deleteCertificate(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  }
};

// --- EXPERIENCE ---
exports.getExperience = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.json({ success: true, data: jsonDb.getExperience() });
    }
    const list = await Experience.find();
    res.json({ success: true, data: list });
  } catch (err) {
    res.json({ success: true, data: jsonDb.getExperience() });
  }
};

exports.createExperience = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.certificatePath = `/user-data/certificates/${req.file.filename}`;
    }
    if (!getIsConnected()) {
      const item = jsonDb.createExperience(data);
      return res.status(201).json({ success: true, data: item });
    }
    const item = await Experience.create(data);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    const data = req.body;
    if (req.file) {
      data.certificatePath = `/user-data/certificates/${req.file.filename}`;
    }
    const item = jsonDb.createExperience(data);
    res.status(201).json({ success: true, data: item });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.certificatePath = `/user-data/certificates/${req.file.filename}`;
    }
    if (!getIsConnected()) {
      const item = jsonDb.updateExperience(req.params.id, data);
      return res.json({ success: true, data: item });
    }
    const item = await Experience.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ success: true, data: item });
  } catch (err) {
    const data = req.body;
    if (req.file) {
      data.certificatePath = `/user-data/certificates/${req.file.filename}`;
    }
    const item = jsonDb.updateExperience(req.params.id, data);
    res.json({ success: true, data: item });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    if (!getIsConnected()) {
      jsonDb.deleteExperience(req.params.id);
      return res.json({ success: true, message: 'Deleted successfully' });
    }
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    jsonDb.deleteExperience(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  }
};

// --- ACHIEVEMENTS ---
exports.getAchievements = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.json({ success: true, data: jsonDb.getAchievements() });
    }
    const list = await Achievement.find();
    res.json({ success: true, data: list });
  } catch (err) {
    res.json({ success: true, data: jsonDb.getAchievements() });
  }
};

exports.createAchievement = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.certificatePath = `/user-data/certificates/${req.file.filename}`;
    }
    if (!getIsConnected()) {
      const item = jsonDb.createAchievement(data);
      return res.status(201).json({ success: true, data: item });
    }
    const item = await Achievement.create(data);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    const data = req.body;
    if (req.file) {
      data.certificatePath = `/user-data/certificates/${req.file.filename}`;
    }
    const item = jsonDb.createAchievement(data);
    res.status(201).json({ success: true, data: item });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.certificatePath = `/user-data/certificates/${req.file.filename}`;
    }
    if (!getIsConnected()) {
      const item = jsonDb.updateAchievement(req.params.id, data);
      return res.json({ success: true, data: item });
    }
    const item = await Achievement.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ success: true, data: item });
  } catch (err) {
    const data = req.body;
    if (req.file) {
      data.certificatePath = `/user-data/certificates/${req.file.filename}`;
    }
    const item = jsonDb.updateAchievement(req.params.id, data);
    res.json({ success: true, data: item });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    if (!getIsConnected()) {
      jsonDb.deleteAchievement(req.params.id);
      return res.json({ success: true, message: 'Deleted successfully' });
    }
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    jsonDb.deleteAchievement(req.params.id);
    res.json({ success: true, message: 'Deleted successfully' });
  }
};

// --- RESUME ---
exports.getResume = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.json({ success: true, data: jsonDb.getResume() });
    }
    const resume = await Resume.findOne({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: resume });
  } catch (err) {
    res.json({ success: true, data: jsonDb.getResume() });
  }
};

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    if (!getIsConnected()) {
      const newResume = jsonDb.setResume({
        title: req.file.originalname,
        filePath: `/user-data/resume/${req.file.filename}`,
        fileSize: req.file.size
      });
      return res.status(201).json({ success: true, data: newResume });
    }
    await Resume.updateMany({}, { isActive: false });
    const newResume = await Resume.create({
      title: req.file.originalname,
      filePath: `/user-data/resume/${req.file.filename}`,
      fileSize: req.file.size,
      isActive: true
    });
    res.status(201).json({ success: true, data: newResume });
  } catch (err) {
    if (req.file) {
      const newResume = jsonDb.setResume({
        title: req.file.originalname,
        filePath: `/user-data/resume/${req.file.filename}`,
        fileSize: req.file.size
      });
      return res.status(201).json({ success: true, data: newResume });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    if (!getIsConnected()) {
      jsonDb.deleteResume();
      return res.json({ success: true, message: 'Resume deleted successfully' });
    }
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Resume deleted successfully' });
  } catch (err) {
    jsonDb.deleteResume();
    res.json({ success: true, message: 'Resume deleted successfully' });
  }
};

// --- SOCIALS ---
exports.getSocials = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.json({ success: true, data: jsonDb.getSocials() });
    }
    let social = await Social.findOne();
    if (!social) social = new Social();
    res.json({ success: true, data: social });
  } catch (err) {
    res.json({ success: true, data: jsonDb.getSocials() });
  }
};

exports.updateSocials = async (req, res) => {
  try {
    if (!getIsConnected()) {
      const updated = jsonDb.updateSocials(req.body);
      return res.json({ success: true, data: updated });
    }
    let social = await Social.findOne();
    if (!social) {
      social = new Social(req.body);
    } else {
      Object.assign(social, req.body);
    }
    await social.save();
    res.json({ success: true, data: social });
  } catch (err) {
    const updated = jsonDb.updateSocials(req.body);
    res.json({ success: true, data: updated });
  }
};

// --- CONTACT MESSAGES ---
exports.getContacts = async (req, res) => {
  try {
    if (!getIsConnected()) {
      return res.json({ success: true, data: jsonDb.getContacts() });
    }
    const list = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  } catch (err) {
    res.json({ success: true, data: jsonDb.getContacts() });
  }
};

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }
    if (!getIsConnected()) {
      const item = jsonDb.createContact({ name, email, subject, message });
      return res.status(201).json({ success: true, message: 'MISSION TRANSMITTED SUCCESSFULLY.', data: item });
    }
    const item = await Contact.create({ name, email, subject, message });
    res.status(201).json({ success: true, message: 'MISSION TRANSMITTED SUCCESSFULLY.', data: item });
  } catch (err) {
    const { name, email, subject, message } = req.body;
    const item = jsonDb.createContact({ name, email, subject, message });
    res.status(201).json({ success: true, message: 'MISSION TRANSMITTED SUCCESSFULLY.', data: item });
  }
};

exports.updateContactStatus = async (req, res) => {
  try {
    if (!getIsConnected()) {
      const item = jsonDb.updateContactStatus(req.params.id, req.body.status);
      return res.json({ success: true, data: item });
    }
    const item = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, data: item });
  } catch (err) {
    const item = jsonDb.updateContactStatus(req.params.id, req.body.status);
    res.json({ success: true, data: item });
  }
};
