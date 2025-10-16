const express = require('express');
const router = express.Router();
const { founderSignup } = require('../controller/founder.controller');

// Founder signup route
router.post('/signup', founderSignup);

module.exports = router;
