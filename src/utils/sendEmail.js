const nodemailer = require('nodemailer');
const emailTemplates = require('../../templates/emailTemplates');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const html = emailTemplates.passwordResetEmail(resetUrl);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset Request',
    html
  };

  await transporter.sendMail(mailOptions);
};

// Send password reset success email
const sendPasswordResetSuccessEmail = async (email) => {
  const html = emailTemplates.passwordResetSuccessEmail();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset Successful',
    html
  };

  await transporter.sendMail(mailOptions);
};

// Send email verification email
const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
  const html = emailTemplates.emailVerificationEmail(verificationUrl);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify Your Email',
    html
  };

  await transporter.sendMail(mailOptions);
};

// Send login alert email
const sendLoginAlertEmail = async (email, loginDetails) => {
  const html = emailTemplates.loginAlertEmail(loginDetails);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'New Login Detected',
    html
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
  sendVerificationEmail,
  sendLoginAlertEmail
};
