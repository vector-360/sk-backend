const express = require('express');
const router = express.Router();
const { getRecruiterProfile, uploadProfilePicture, deleteProfilePicture } = require('../controller/recruiter.controller');
const { isAuthenticated, isRecruiter } = require('../middlewares/isAuthenticated');
const { upload } = require('../config/cloudinary');


// Protected recruiter routes
router.get('/profile', isAuthenticated, isRecruiter, getRecruiterProfile);

router.post('/upload-profile-picture', isAuthenticated, isRecruiter, upload.single('profilePicture'), uploadProfilePicture);
router.delete('/delete-profile-picture', isAuthenticated, isRecruiter, deleteProfilePicture);


module.exports = router;
