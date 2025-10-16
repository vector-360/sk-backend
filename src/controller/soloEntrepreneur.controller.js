const SoloEntrepreneur = require('../models/soloEntrepreneur.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
      termsAgreed
    });

    await newSoloEntrepreneur.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newSoloEntrepreneur._id, isGuest: false },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' } // Token expires in 7 days
    );

    res.status(201).json({
      success: true,
      message: 'Solo Entrepreneur account created successfully.',
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
        },
        token
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
          role: req.user.role
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

module.exports = {
  soloEntrepreneurSignup,
  getSoloEntrepreneurProfile
};
