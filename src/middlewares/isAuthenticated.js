const jwt = require('jsonwebtoken');
const User = require('../models/user.schema');
const Founder = require('../models/founder.schema');
const Recruiter = require('../models/recruiter.schema');
const SoloEntrepreneur = require('../models/soloEntrepreneur.schema');

// Helper: find user across all collections
const findUserById = async (userId) => {
  return (
    (await User.findById(userId)) ||
    (await Founder.findById(userId)) ||
    (await Recruiter.findById(userId)) ||
    (await SoloEntrepreneur.findById(userId))
  );
};

// Middleware to authenticate all user types
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    const user = await findUserById(decoded.userId);

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

// Middleware to check if user is Founder
const isFounder = (req, res, next) => {
  if (req.user && req.user.role === 'Founder') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Founder role required.'
    });
  }
};

// Middleware to check if user is Recruiter
const isRecruiter = (req, res, next) => {
  if (req.user && req.user.role === 'Recruiter') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Recruiter role required.'
    });
  }
};

// Middleware to check if user is Solo Entrepreneur
const isSoloEntrepreneur = (req, res, next) => {
  if (req.user && req.user.role === 'Solo Entrepreneur') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Solo Entrepreneur role required.'
    });
  }
};

// Middleware to check if user is Guest
const isGuest = (req, res, next) => {
  if (req.user && req.user.isGuest) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Guest user required.'
    });
  }
};

// Middleware to check if user is Full User (not guest)
const isFullUser = (req, res, next) => {
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
  isAuthenticated,
  isFounder,
  isRecruiter,
  isSoloEntrepreneur,
  isGuest,
  isFullUser
};
