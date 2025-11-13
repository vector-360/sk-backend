const express = require('express');
const router = express.Router();
const { guestSignin, getGuestProfile } = require('../controller/user.controller');
const { isAuthenticated, isGuest } = require('../middlewares/isAuthenticated');

// Guest sign-in route
router.post('/guest-signin', guestSignin);

// Protected guest routes
router.get('/guest-profile', isAuthenticated, isGuest, getGuestProfile);

module.exports = router;
