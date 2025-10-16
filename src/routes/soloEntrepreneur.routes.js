const express = require('express');
const router = express.Router();
const { soloEntrepreneurSignup, getSoloEntrepreneurProfile } = require('../controller/soloEntrepreneur.controller');
const { isAuthenticated, isSoloEntrepreneur } = require('../middlewares/isAuthenticated');

// Solo Entrepreneur signup route
router.post('/signup', soloEntrepreneurSignup);

// Protected solo entrepreneur routes
router.get('/profile', isAuthenticated, isSoloEntrepreneur, getSoloEntrepreneurProfile);

module.exports = router;
