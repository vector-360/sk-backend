const express = require('express');
const router = express.Router();
const { founderSignup, getFounderProfile } = require('../controller/founder.controller');
const { isAuthenticated, isFounder } = require('../middlewares/isAuthenticated');

// Founder signup route
router.post('/signup', founderSignup);

// Protected founder routes
router.get('/profile', isAuthenticated, isFounder, getFounderProfile);

module.exports = router;
