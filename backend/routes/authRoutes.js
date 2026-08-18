const express = require('express');
const router = express.Router();
const { loginAdmin, getMe, updateCredentials } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/me', protect, getMe);
router.put('/credentials', protect, updateCredentials);

module.exports = router;
