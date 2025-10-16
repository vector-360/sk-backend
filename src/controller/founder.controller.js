const Founder = require('../models/founder.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
      termsAgreed
    });

    await newFounder.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newFounder._id, isGuest: false },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' } // Token expires in 7 days
    );

    res.status(201).json({
      success: true,
      message: 'Founder account created successfully.',
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
        },
        token
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

module.exports = {
  founderSignup
};
