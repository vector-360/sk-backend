const express = require('express');
const router = express.Router();
const { recruiterSignup } = require('../controller/recruiter.controller');

// Recruiter signup route
router.post('/signup', recruiterSignup);

module.exports = router;
