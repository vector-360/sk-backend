const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');

const guestSignin = async (req, res) => {
  try {
    const { fullName, email, termsAgreed } = req.body;

    // Validate required fields
    if (!fullName || !email || termsAgreed === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and terms agreement are required.'
      });
    }

    // Check if terms are agreed
    if (!termsAgreed) {
      return res.status(400).json({
        success: false,
        message: 'You must agree to the terms and conditions.'
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists. Please use a different email or log in.'
      });
    }

    // Create guest user
    const guestUser = new User({
      fullName,
      email,
      isGuest: true,
      termsAgreed
    });

    await guestUser.save();

    // Generate JWT token for guest session
    const token = jwt.sign(
      { userId: guestUser._id, isGuest: true },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '24h' } // Token expires in 24 hours
    );

    res.status(201).json({
      success: true,
      message: 'Guest account created successfully.',
      data: {
        user: {
          id: guestUser._id,
          fullName: guestUser.fullName,
          email: guestUser.email,
          isGuest: guestUser.isGuest
        },
        token
      }
    });
  } catch (error) {
    console.error('Error in guest signin:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

module.exports = {
  guestSignin
};
