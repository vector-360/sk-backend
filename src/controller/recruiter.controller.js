const Recruiter = require('../models/recruiter.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
      termsAgreed
    });

    await newRecruiter.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newRecruiter._id, isGuest: false },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' } // Token expires in 7 days
    );

    res.status(201).json({
      success: true,
      message: 'Recruiter account created successfully.',
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
        },
        token
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

module.exports = {
  recruiterSignup
};
