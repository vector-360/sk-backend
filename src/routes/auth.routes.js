const express = require('express');
const router = express.Router();
const { signup, login, forgotPassword, resetPassword, verifyEmail, resendVerificationEmail, initiateGoogleAuth, handleGoogleCallback, unlinkGoogle, setPasswordForGoogleUser } = require('../controller/auth.controller');

// Auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification-email', resendVerificationEmail);

// Google OAuth routes
router.get('/google/initiate', initiateGoogleAuth);
router.get('/google/callback', handleGoogleCallback);
router.delete('/google/unlink/:userId', unlinkGoogle);
router.post('/google/set-password/:userId', setPasswordForGoogleUser);

module.exports = router;
