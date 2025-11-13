const express = require('express');
const router = express.Router();
const { getSoloEntrepreneurProfile, uploadProfilePicture, deleteProfilePicture, addProfessionalDetails, addCollaborationGoals, addBackground, addPreference, addPersonality } = require('../controller/soloEntrepreneur.controller');
const { isAuthenticated, isSoloEntrepreneur } = require('../middlewares/isAuthenticated');
const { upload } = require('../config/cloudinary');
;

// Protected solo entrepreneur routes
router.get('/profile', isAuthenticated, isSoloEntrepreneur, getSoloEntrepreneurProfile);

router.post('/upload-profile-picture', isAuthenticated, isSoloEntrepreneur, upload.single('profilePicture'), uploadProfilePicture);
router.delete('/delete-profile-picture', isAuthenticated, isSoloEntrepreneur, deleteProfilePicture);

// route for profession details
router.post('/professional-details', isAuthenticated, isSoloEntrepreneur, addProfessionalDetails);

// route for collaboration goals
router.post('/collaboration', isAuthenticated, isSoloEntrepreneur, addCollaborationGoals);

// route for background
router.post('/background', isAuthenticated, isSoloEntrepreneur, addBackground);

// route for preference
router.post('/preference', isAuthenticated, isSoloEntrepreneur, addPreference);

// route for personality
router.post('/personality', isAuthenticated, isSoloEntrepreneur, addPersonality);


module.exports = router;
