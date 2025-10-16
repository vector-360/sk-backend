const express = require('express');
const router = express.Router();
const { login, forgotPassword, resetPassword, verifyEmail } = require('../controller/auth.controller');

// Auth routes
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);

module.exports = router;
