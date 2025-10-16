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
          role: req.user.role
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

module.exports = {
  recruiterSignup,
  getRecruiterProfile
};
