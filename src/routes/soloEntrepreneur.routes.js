const express = require('express');
const router = express.Router();
const { soloEntrepreneurSignup, getSoloEntrepreneurProfile, uploadProfilePicture, deleteProfilePicture } = require('../controller/soloEntrepreneur.controller');
const { isAuthenticated, isSoloEntrepreneur } = require('../middlewares/isAuthenticated');
const { upload } = require('../config/cloudinary');

// Solo Entrepreneur signup route
router.post('/signup', soloEntrepreneurSignup);

// Protected solo entrepreneur routes
router.get('/profile', isAuthenticated, isSoloEntrepreneur, getSoloEntrepreneurProfile);

router.post('/upload-profile-picture', isAuthenticated, isSoloEntrepreneur, upload.single('profilePicture'), uploadProfilePicture);
router.delete('/delete-profile-picture', isAuthenticated, isSoloEntrepreneur, deleteProfilePicture);


module.exports = router;
