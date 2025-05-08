const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validator');

// Register a new user
router.post('/register', validateRegister, registerUser);

// Login user
router.post('/login', validateLogin, loginUser);

// Get user profile
router.get('/me', protect, getMe);

module.exports = router;