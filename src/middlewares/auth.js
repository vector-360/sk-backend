const jwt = require('jsonwebtoken');
const User = require('../models/user.schema');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

const guestAccess = (req, res, next) => {
  // Allow access for both full users and guests
  if (req.user && (req.user.isGuest || !req.user.isGuest)) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Guest or authenticated user required.'
    });
  }
};

const fullUserOnly = (req, res, next) => {
  // Restrict access to full users only (not guests)
  if (req.user && !req.user.isGuest) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Full account required.'
    });
  }
};

module.exports = {
  authenticate,
  guestAccess,
  fullUserOnly
};
