const Recruiter = require('../models/recruiter.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/sendEmail');

const recruiterSignup = async (req, res) => {
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
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
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

    // Create new recruiter
    const newRecruiter = new Recruiter({
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

    await newRecruiter.save();

    // Send verification email
    try {
      await sendVerificationEmail(newRecruiter.email, verificationToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Continue with signup even if email fails, but log the error
    }

    res.status(201).json({
      success: true,
      message: 'Recruiter account created successfully. Please check your email to verify your account.',
      data: {
        user: {
          id: newRecruiter._id,
          firstName: newRecruiter.firstName,
          lastName: newRecruiter.lastName,
          email: newRecruiter.email,
          country: newRecruiter.country,
          state: newRecruiter.state,
          phoneNumber: newRecruiter.phoneNumber,
          role: newRecruiter.role
        }
      }
    });
  } catch (error) {
    console.error('Error in recruiter signup:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

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
          profilePhoto: req.user.profilePhoto,
          companyName: req.user.companyName,
          companyWebsite: req.user.companyWebsite,
          industryFocus: req.user.industryFocus,
          companySize: req.user.companySize,
          recruitmentSpecialty: req.user.recruitmentSpecialty,
          yearsOfExperience: req.user.yearsOfExperience,
          certifications: req.user.certifications,
          preferredCandidateProfile: req.user.preferredCandidateProfile,
          hiringNeeds: req.user.hiringNeeds,
          positionsToFill: req.user.positionsToFill,
          goalOnPlatform: req.user.goalOnPlatform,
          linkedInProfile: req.user.linkedInProfile,
          previousPlacements: req.user.previousPlacements,
          availability: req.user.availability,
          preferredCommunicationStyle: req.user.preferredCommunicationStyle,
          shortBio: req.user.shortBio,
          recruitmentApproach: req.user.recruitmentApproach
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

const updateProfilePage1 = async (req, res) => {
  try {
    const { firstName, lastName, profilePhoto, country, state, role } = req.body;

    // Validate required fields for update
    if (!firstName || !lastName || !country || !state || !role) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, country, state, and role are required.'
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

    // Update the recruiter's profile page 1 info
    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
      req.user._id,
      {
        firstName,
        lastName,
        profilePhoto,
        country,
        state,
        role,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecruiter) {
      return res.status(404).json({
        success: false,
        message: 'Recruiter not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data saved.',
      data: {
        user: {
          id: updatedRecruiter._id,
          firstName: updatedRecruiter.firstName,
          lastName: updatedRecruiter.lastName,
          email: updatedRecruiter.email,
          country: updatedRecruiter.country,
          state: updatedRecruiter.state,
          phoneNumber: updatedRecruiter.phoneNumber,
          role: updatedRecruiter.role,
          profilePhoto: updatedRecruiter.profilePhoto
        },
        nextPage: 2
      }
    });
  } catch (error) {
    console.error('Error updating profile page 1:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

const updateProfilePage2 = async (req, res) => {
  try {
    const { companyName, companyWebsite, industryFocus, companySize, recruitmentSpecialty, yearsOfExperience, certifications } = req.body;

    // Validate yearsOfExperience if provided
    if (yearsOfExperience !== undefined && (typeof yearsOfExperience !== 'number' || yearsOfExperience < 0)) {
      return res.status(400).json({
        success: false,
        message: 'Years of experience must be a non-negative number.'
      });
    }

    // Validate industryFocus if provided
    if (industryFocus && !Array.isArray(industryFocus)) {
      return res.status(400).json({
        success: false,
        message: 'Industry focus must be an array of strings.'
      });
    }

    // Update the recruiter's profile page 2 info
    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
      req.user._id,
      {
        companyName,
        companyWebsite,
        industryFocus,
        companySize,
        recruitmentSpecialty,
        yearsOfExperience,
        certifications,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecruiter) {
      return res.status(404).json({
        success: false,
        message: 'Recruiter not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data saved.',
      data: {
        user: {
          id: updatedRecruiter._id,
          companyName: updatedRecruiter.companyName,
          companyWebsite: updatedRecruiter.companyWebsite,
          industryFocus: updatedRecruiter.industryFocus,
          companySize: updatedRecruiter.companySize,
          recruitmentSpecialty: updatedRecruiter.recruitmentSpecialty,
          yearsOfExperience: updatedRecruiter.yearsOfExperience,
          certifications: updatedRecruiter.certifications
        },
        nextPage: 3
      }
    });
  } catch (error) {
    console.error('Error updating profile page 2:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

const updateProfilePage3 = async (req, res) => {
  try {
    const { preferredCandidateProfile, hiringNeeds, positionsToFill, goalOnPlatform } = req.body;

    // Update the recruiter's profile page 3 info
    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
      req.user._id,
      {
        preferredCandidateProfile,
        hiringNeeds,
        positionsToFill,
        goalOnPlatform,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecruiter) {
      return res.status(404).json({
        success: false,
        message: 'Recruiter not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data saved.',
      data: {
        user: {
          id: updatedRecruiter._id,
          preferredCandidateProfile: updatedRecruiter.preferredCandidateProfile,
          hiringNeeds: updatedRecruiter.hiringNeeds,
          positionsToFill: updatedRecruiter.positionsToFill,
          goalOnPlatform: updatedRecruiter.goalOnPlatform
        },
        nextPage: 4
      }
    });
  } catch (error) {
    console.error('Error updating profile page 3:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

const updateProfilePage4 = async (req, res) => {
  try {
    const { linkedInProfile, previousPlacements } = req.body;

    // Update the recruiter's profile page 4 info
    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
      req.user._id,
      {
        linkedInProfile,
        previousPlacements,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecruiter) {
      return res.status(404).json({
        success: false,
        message: 'Recruiter not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data saved.',
      data: {
        user: {
          id: updatedRecruiter._id,
          linkedInProfile: updatedRecruiter.linkedInProfile,
          previousPlacements: updatedRecruiter.previousPlacements
        },
        nextPage: 5
      }
    });
  } catch (error) {
    console.error('Error updating profile page 4:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

const updateProfilePage5 = async (req, res) => {
  try {
    const { availability, preferredCommunicationStyle } = req.body;

    // Update the recruiter's profile page 5 info
    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
      req.user._id,
      {
        availability,
        preferredCommunicationStyle,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecruiter) {
      return res.status(404).json({
        success: false,
        message: 'Recruiter not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data saved.',
      data: {
        user: {
          id: updatedRecruiter._id,
          availability: updatedRecruiter.availability,
          preferredCommunicationStyle: updatedRecruiter.preferredCommunicationStyle
        },
        nextPage: 6
      }
    });
  } catch (error) {
    console.error('Error updating profile page 5:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

const updateProfilePage6 = async (req, res) => {
  try {
    const { shortBio, recruitmentApproach } = req.body;

    // Update the recruiter's profile page 6 info
    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
      req.user._id,
      {
        shortBio,
        recruitmentApproach,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecruiter) {
      return res.status(404).json({
        success: false,
        message: 'Recruiter not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile page 6 updated successfully.',
      data: {
        user: {
          id: updatedRecruiter._id,
          shortBio: updatedRecruiter.shortBio,
          recruitmentApproach: updatedRecruiter.recruitmentApproach
        },
        completionMessage: `
Profile Completed!
Your profile is now complete.
Get ready to explore your
personalized dashboard.`
      }
    });
  } catch (error) {
    console.error('Error updating profile page 6:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded.'
      });
    }

    // Update the recruiter's profile picture
    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
      req.user._id,
      {
        profilePicture: {
          url: req.file.path,
          publicId: req.file.filename,
          uploadedAt: new Date()
        },
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecruiter) {
      return res.status(404).json({
        success: false,
        message: 'Recruiter not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile picture uploaded successfully.',
      data: {
        profilePicture: updatedRecruiter.profilePicture
      }
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

const deleteProfilePicture = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.user._id);

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: 'Recruiter not found.'
      });
    }

    if (!recruiter.profilePicture || !recruiter.profilePicture.publicId) {
      return res.status(400).json({
        success: false,
        message: 'No profile picture to delete.'
      });
    }

    // Delete from Cloudinary
    const { deleteImage } = require('../config/cloudinary');
    await deleteImage(recruiter.profilePicture.publicId);

    // Update the recruiter's profile picture to null
    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
      req.user._id,
      {
        profilePicture: {
          url: null,
          publicId: null,
          uploadedAt: null
        },
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile picture deleted successfully.'
    });
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

module.exports = {
  recruiterSignup,
  getRecruiterProfile,
  updateProfilePage1,
  updateProfilePage2,
  updateProfilePage3,
  updateProfilePage4,
  updateProfilePage5,
  updateProfilePage6,
  uploadProfilePicture,
  deleteProfilePicture
};
