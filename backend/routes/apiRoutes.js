const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  getProfile, updateProfile,
  getEducation, createEducation, updateEducation, deleteEducation,
  getSkills, createSkill, updateSkill, deleteSkill,
  getProjects, createProject, updateProject, deleteProject,
  getCertificates, createCertificate, updateCertificate, deleteCertificate,
  getExperience, createExperience, updateExperience, deleteExperience,
  getAchievements, createAchievement, updateAchievement, deleteAchievement,
  getResume, uploadResume, deleteResume,
  getSocials, updateSocials,
  getContacts, submitContact, updateContactStatus
} = require('../controllers/portfolioController');

// Profile
router.get('/profile', getProfile);
router.put('/profile', protect, updateProfile);

// Education
router.get('/education', getEducation);
router.post('/education', protect, createEducation);
router.put('/education/:id', protect, updateEducation);
router.delete('/education/:id', protect, deleteEducation);

// Skills
router.get('/skills', getSkills);
router.post('/skills', protect, createSkill);
router.put('/skills/:id', protect, updateSkill);
router.delete('/skills/:id', protect, deleteSkill);

// Projects
router.get('/projects', getProjects);
router.post('/projects', protect, createProject);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);

// Certificates
router.get('/certificates', getCertificates);
router.post('/certificates', protect, upload.single('certificateFile'), createCertificate);
router.put('/certificates/:id', protect, upload.single('certificateFile'), updateCertificate);
router.delete('/certificates/:id', protect, deleteCertificate);

// Experience
router.get('/experience', getExperience);
router.post('/experience', protect, upload.single('certificateFile'), createExperience);
router.put('/experience/:id', protect, upload.single('certificateFile'), updateExperience);
router.delete('/experience/:id', protect, deleteExperience);

// Achievements
router.get('/achievements', getAchievements);
router.post('/achievements', protect, upload.single('certificateFile'), createAchievement);
router.put('/achievements/:id', protect, upload.single('certificateFile'), updateAchievement);
router.delete('/achievements/:id', protect, deleteAchievement);

// Resume
router.get('/resume', getResume);
router.post('/resume/upload', protect, upload.single('resume'), uploadResume);
router.delete('/resume/:id', protect, deleteResume);

// Socials
router.get('/socials', getSocials);
router.put('/socials', protect, updateSocials);

// Contact Messages
router.post('/contact', submitContact);
router.get('/contact', protect, getContacts);
router.put('/contact/:id/status', protect, updateContactStatus);

module.exports = router;
