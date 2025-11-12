const Recruiter = require('../models/recruiter.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/sendEmail');
const { deleteImage, extractPublicId } = require('../config/cloudinary');

const getRecruiterProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: req.user._id,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email,
          country: req.user.country,
          state: req.user.state,
          phoneNumber: req.user.phoneNumber,
          role: req.user.role,
          profilePicture: req.user.profilePicture
        }
      }
    });
  } catch (error) {
    console.error('Error fetching recruiter profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Upload Profile Picture
const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const userId = req.user.id;
    const user = await Recruiter.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete old profile picture if exists
    if (user.profilePicture?.publicId) {
      try {
        await deleteImage(user.profilePicture.publicId);
      } catch (error) {
        console.error('Error deleting old profile picture:', error);
        // Continue with upload even if deletion fails
      }
    }

    // Update user with new profile picture
    user.profilePicture = {
      url: req.file.path,
      publicId: req.file.filename,
      uploadedAt: new Date()
    };

    // Also update the avatar field for backward compatibility
    user.avatar = req.file.path;

    await user.save();

    return res.status(200).json({
      message: "Profile picture uploaded successfully",
      profilePicture: {
        url: user.profilePicture.url,
        uploadedAt: user.profilePicture.uploadedAt
      }
    });

  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Profile Picture
const deleteProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Recruiter.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.profilePicture?.publicId) {
      return res.status(400).json({ message: "No profile picture to delete" });
    }

    // Delete image from Cloudinary
    try {
      await deleteImage(user.profilePicture.publicId);
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      // Continue with removing from DB even if Cloudinary deletion fails
    }

    // Remove profile picture from user
    user.profilePicture = undefined;
    user.avatar = undefined;

    await user.save();

    return res.status(200).json({
      message: "Profile picture deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting profile picture:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  getRecruiterProfile,
  uploadProfilePicture,
  deleteProfilePicture,
  deleteImage,
  extractPublicId
};
