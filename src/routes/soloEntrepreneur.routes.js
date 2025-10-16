const express = require('express');
const router = express.Router();
const { soloEntrepreneurSignup } = require('../controller/soloEntrepreneur.controller');

// Solo Entrepreneur signup route
router.post('/signup', soloEntrepreneurSignup);

module.exports = router;
