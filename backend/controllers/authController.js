const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const { getIsConnected } = require('../config/db');
const jsonDb = require('../utils/jsonDb');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_jwt_key_sakala_spider_sense_2026', {
    expiresIn: '7d',
  });
};

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    // 1. Check local jsonDb storage first
    const jsonAdmin = jsonDb.getAdmin();
    if (jsonAdmin && jsonAdmin.username) {
      const userMatches = username.trim().toLowerCase() === jsonAdmin.username.trim().toLowerCase();
      if (userMatches) {
        if (password === jsonAdmin.password) {
          const token = generateToken('admin-id');
          return res.json({
            success: true,
            token,
            admin: { username: jsonAdmin.username, role: 'admin' }
          });
        } else {
          return res.status(401).json({ success: false, message: 'Incorrect password. Please check your password and try again.' });
        }
      }
    }

    // 2. Check MongoDB if connected
    if (getIsConnected()) {
      const admin = await Admin.findOne({ username });
      if (admin) {
        if (await admin.matchPassword(password)) {
          const token = generateToken(admin._id);
          return res.json({
            success: true,
            token,
            admin: { username: admin.username, role: admin.role }
          });
        } else {
          return res.status(401).json({ success: false, message: 'Incorrect password. Please check your password and try again.' });
        }
      }
    }

    return res.status(401).json({ success: false, message: 'Incorrect username or password. Please try again.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    res.json({ success: true, admin: req.admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCredentials = async (req, res) => {
  try {
    const { newUsername, newPassword } = req.body;
    if (!newUsername || !newPassword) {
      return res.status(400).json({ success: false, message: 'New username and password are required' });
    }

    // Persist to local jsonDb
    jsonDb.updateAdmin({ username: newUsername, password: newPassword });

    // Update MongoDB Admin document if connected
    if (getIsConnected()) {
      let admin = await Admin.findOne();
      if (!admin) {
        admin = new Admin({ username: newUsername, password: newPassword, role: 'admin' });
      } else {
        admin.username = newUsername;
        admin.password = newPassword;
      }
      await admin.save();
    }

    return res.json({
      success: true,
      message: 'Admin credentials updated successfully! Please use your new username and password for future logins.',
      admin: { username: newUsername, role: 'admin' }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
