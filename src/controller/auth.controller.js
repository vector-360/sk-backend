const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const Founder = require("../models/founder.schema.js");
const Recruiter = require("../models/recruiter.schema.js");
const SoloEntrepreneur = require("../models/soloEntrepreneur.schema.js");
const { sendPasswordResetEmail, sendPasswordResetSuccessEmail, sendVerificationEmail, sendLoginAlertEmail } = require("../utils/sendEmail.js");
const { sendOtpSms } = require("../utils/sendSms.js");
const { generateOtp } = require("./services.js");
const emailTemplates = require("../../templates/emailTemplates.js");
const { sendEmail } = require("../config/email.js");

// Helper: find user across all collections
const findUserByEmail = async (email) => {
  return (
    (await Founder.findOne({ email })) ||
    (await Recruiter.findOne({ email })) ||
    (await SoloEntrepreneur.findOne({ email }))
  );
};

const findUserByToken = async (resetTokenHash) => {
  const query = {
    resetPasswordToken: resetTokenHash,
    resetPasswordExpires: { $gt: Date.now() },
  };

  return (
    (await Founder.findOne(query)) ||
    (await Recruiter.findOne(query)) ||
    (await SoloEntrepreneur.findOne(query))
  );
};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email before logging in.'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    );

    // Send login alert email
    try {
      await sendLoginAlertEmail(user.email, {
        time: new Date().toISOString(),
        ip: req.ip,
        device: req.get('User-Agent')
      });
    } catch (emailError) {
      console.error('Failed to send login alert:', emailError);
    }

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Forgot password function
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required.'
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set token and expiration
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send reset email
    try {
      await sendPasswordResetEmail(user.email, resetToken);
    } catch (emailError) {
      console.error('Failed to send reset email:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send reset email.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Password reset email sent.'
    });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Reset password function
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required.'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const user = await findUserByToken(resetTokenHash);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token.'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // Send success email
    try {
      await sendPasswordResetSuccessEmail(user.email);
    } catch (emailError) {
      console.error('Failed to send success email:', emailError);
    }

    res.status(200).json({
      success: true,
      message: 'Password reset successful.'
    });
  } catch (error) {
    console.error('Error in reset password:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

// Verify email function
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verification token is required.'
      });
    }

    const verificationTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with matching verification token
    const user = (
      (await Founder.findOne({ emailVerificationToken: verificationTokenHash })) ||
      (await Recruiter.findOne({ emailVerificationToken: verificationTokenHash })) ||
      (await SoloEntrepreneur.findOne({ emailVerificationToken: verificationTokenHash }))
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification token.'
      });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Your Email has been successfully verified!'
    });
  } catch (error) {
    console.error('Error in verify email:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    });
  }
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
  verifyEmail
};
