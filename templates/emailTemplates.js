const passwordResetEmail = (resetUrl) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>Password Reset Request</h2>
    <p>You requested a password reset for your account.</p>
    <p>Click the button below to reset your password:</p>
    <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
    <p>If you didn't request this, please ignore this email.</p>
    <p>This link will expire in 1 hour.</p>
  </div>
`;

const passwordResetSuccessEmail = () => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>Password Reset Successful</h2>
    <p>Your password has been successfully reset.</p>
    <p>If you didn't make this change, please contact support immediately.</p>
  </div>
`;

const emailVerificationEmail = (verificationUrl) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>Verify Your Email</h2>
    <p>Welcome! Please verify your email address to complete your registration.</p>
    <a href="${verificationUrl}" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
    <p>If the button doesn't work, copy and paste this link into your browser: ${verificationUrl}</p>
  </div>
`;

const loginAlertEmail = (loginDetails) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>New Login Detected</h2>
    <p>A new login was detected on your account.</p>
    <p><strong>Time:</strong> ${loginDetails.time}</p>
    <p><strong>IP Address:</strong> ${loginDetails.ip}</p>
    <p><strong>Device:</strong> ${loginDetails.device}</p>
    <p>If this wasn't you, please change your password immediately and contact support.</p>
  </div>
`;

module.exports = {
  passwordResetEmail,
  passwordResetSuccessEmail,
  emailVerificationEmail,
  loginAlertEmail
};
