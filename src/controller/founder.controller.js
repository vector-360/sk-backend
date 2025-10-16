const Founder = require('../models/founder.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/sendEmail');

const founderSignup = async (req, res) => {
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
    const existingFounder = await Founder.findOne({ email });
    if (existingFounder) {
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

    // Create new founder
    const newFounder = new Founder({
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

    await newFounder.save();

    // Send verification email
    try {
      await sendVerificationEmail(newFounder.email, verificationToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Continue with signup even if email fails, but log the error
    }

    res.status(201).json({
      success: true,
      message: 'Founder account created successfully. Please check your email to verify your account.',
      data: {
        user: {
          id: newFounder._id,
          firstName: newFounder.firstName,
          lastName: newFounder.lastName,
          email: newFounder.email,
          country: newFounder.country,
          state: newFounder.state,
          phoneNumber: newFounder.phoneNumber,
          role: newFounder.role
        }
      }
    });
  } catch (error) {
    console.error('Error in founder signup:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

const getFounderProfile = async (req, res) => {
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
    console.error('Error fetching founder profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

module.exports = {
  founderSignup,
  getFounderProfile
};
