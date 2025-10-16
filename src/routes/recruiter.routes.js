const express = require('express');
const router = express.Router();
const { recruiterSignup, getRecruiterProfile } = require('../controller/recruiter.controller');
const { isAuthenticated, isRecruiter } = require('../middlewares/isAuthenticated');

// Recruiter signup route
router.post('/signup', recruiterSignup);

// Protected recruiter routes
router.get('/profile', isAuthenticated, isRecruiter, getRecruiterProfile);

module.exports = router;
