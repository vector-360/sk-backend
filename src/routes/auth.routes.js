const express = require('express');
const router = express.Router();
const { signup, login, forgotPassword, resetPassword, verifyEmail, resendVerificationEmail } = require('../controller/auth.controller');

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification-email', resendVerificationEmail);

module.exports = router;
