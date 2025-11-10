const SoloEntrepreneur = require('../models/soloEntrepreneur.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/sendEmail');
const { deleteImage, extractPublicId } = require('../config/cloudinary');

const soloEntrepreneurSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, country, state, phoneNumber, password, role, termsAgreed } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !country || !state || !phoneNumber || !password || !role || termsAgreed === undefined) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.'
      });
    }

    // Check if terms are agreed
    if (!termsAgreed) {
      return res.status(400).json({
        success: false,
        message: 'You must agree to the terms and conditions.'
      });
    }

    // Validate role
    const validRoles = ['Founder', 'Recruiter', 'Solo Entrepreneur'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role selected.'
      });
    }

    // Check if email already exists
    const existingSoloEntrepreneur = await SoloEntrepreneur.findOne({ email });
    if (existingSoloEntrepreneur) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists. Please use a different email or log in.'
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenHash = crypto.createHash('sha256').update(verificationToken).digest('hex');

    // Create new solo entrepreneur
    const newSoloEntrepreneur = new SoloEntrepreneur({
      firstName,
      lastName,
      email,
      country,
      state,
      phoneNumber,
      password: hashedPassword,
      role,
      termsAgreed,
      emailVerificationToken: verificationTokenHash
    });

    await newSoloEntrepreneur.save();

    // Send verification email
    try {
      await sendVerificationEmail(newSoloEntrepreneur.email, verificationToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Continue with signup even if email fails, but log the error
    }

    res.status(201).json({
      success: true,
      message: 'Solo Entrepreneur account created successfully. Please check your email to verify your account.',
      data: {
        user: {
          id: newSoloEntrepreneur._id,
          firstName: newSoloEntrepreneur.firstName,
          lastName: newSoloEntrepreneur.lastName,
          email: newSoloEntrepreneur.email,
          country: newSoloEntrepreneur.country,
          state: newSoloEntrepreneur.state,
          phoneNumber: newSoloEntrepreneur.phoneNumber,
          role: newSoloEntrepreneur.role
        }
      }
    });
  } catch (error) {
    console.error('Error in solo entrepreneur signup:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

const getSoloEntrepreneurProfile = async (req, res) => {
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
    console.error('Error fetching solo entrepreneur profile:', error);
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
    const user = await SoloEntrepreneur.findById(userId);

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
    const user = await SoloEntrepreneur.findById(userId);

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
      // Continue with removing from database even if Cloudinary deletion fails
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
  soloEntrepreneurSignup,
  getSoloEntrepreneurProfile,
  uploadProfilePicture,
  deleteProfilePicture,
  deleteImage,
  extractPublicId
};
