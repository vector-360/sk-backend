const express = require('express');
const router = express.Router();
const { guestSignin } = require('../controller/user.controller');

// Guest sign-in route
router.post('/guest-signin', guestSignin);

module.exports = router;
