const passwordResetEmail = (resetUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <title>Password Reset - Softpire</title>
</head>
<body style="font-family: 'Roboto', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Softpire</h1>
      <p style="margin: 10px 0 0; font-size: 16px;">Innovating Your Future</p>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Password Reset Request</h2>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Hello,</p>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">You have requested a password reset for your Softpire account. To proceed, please click the button below to reset your password securely.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; box-shadow: 0 4px 6px rgba(0,123,255,0.3);">Reset Password</a>
      </div>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">If you did not request this password reset, please ignore this email. Your account remains secure.</p>
      <p style="color: #999; font-size: 14px; margin-bottom: 20px;">This link will expire in 1 hour for security reasons.</p>
      <p style="color: #666; line-height: 1.6;">If you have any questions, feel free to contact our support team at <a href="mailto:support@softpire.com" style="color: #007bff;">support@softpire.com</a>.</p>
    </div>
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
      <p style="margin: 0; color: #666; font-size: 14px;">Best regards,<br>The Softpire Team</p>
      <p style="margin: 10px 0 0; color: #999; font-size: 12px;">© 2025 Softpire. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const passwordResetSuccessEmail = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <title>Password Reset Successful - Softpire</title>
</head>
<body style="font-family: 'Roboto', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #28a745, #1e7e34); color: white; padding: 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Softpire</h1>
      <p style="margin: 10px 0 0; font-size: 16px;">Secure & Reliable</p>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Password Reset Successful</h2>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Hello,</p>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Your password has been successfully reset. You can now log in to your Softpire account with your new password.</p>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">If you did not make this change, please contact our support team immediately to secure your account.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://softpire.com/login" style="background: linear-gradient(135deg, #28a745, #1e7e34); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; box-shadow: 0 4px 6px rgba(40,167,69,0.3);">Log In Now</a>
      </div>
      <p style="color: #666; line-height: 1.6;">For any assistance, reach out to us at <a href="mailto:support@softpire.com" style="color: #28a745;">support@softpire.com</a>.</p>
    </div>
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
      <p style="margin: 0; color: #666; font-size: 14px;">Best regards,<br>The Softpire Team</p>
      <p style="margin: 10px 0 0; color: #999; font-size: 12px;">© 2025 Softpire. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const emailVerificationEmail = (verificationUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <title>Email Verification - Softpire</title>
</head>
<body style="font-family: 'Roboto', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Softpire</h1>
      <p style="margin: 10px 0 0; font-size: 16px;">Welcome Aboard</p>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Verify Your Email Address</h2>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Hello,</p>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Thank you for signing up with Softpire! To complete your registration and secure your account, please verify your email address by clicking the button below.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; box-shadow: 0 4px 6px rgba(0,123,255,0.3);">Verify Email</a>
      </div>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">If the button doesn't work, copy and paste this link into your browser: <a href="${verificationUrl}" style="color: #007bff; word-break: break-all;">${verificationUrl}</a></p>
      <p style="color: #999; font-size: 14px; margin-bottom: 20px;">This verification link is valid for 24 hours.</p>
      <p style="color: #666; line-height: 1.6;">Need help? Contact us at <a href="mailto:support@softpire.com" style="color: #007bff;">support@softpire.com</a>.</p>
    </div>
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
      <p style="margin: 0; color: #666; font-size: 14px;">Best regards,<br>The Softpire Team</p>
      <p style="margin: 10px 0 0; color: #999; font-size: 12px;">© 2025 Softpire. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const loginAlertEmail = (loginDetails) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <title>Login Alert - Softpire</title>
</head>
<body style="font-family: 'Roboto', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #ffc107, #e0a800); color: white; padding: 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Softpire</h1>
      <p style="margin: 10px 0 0; font-size: 16px;">Security First</p>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">New Login Detected</h2>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Hello,</p>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">We detected a new login to your Softpire account. If this was you, no action is needed. For your security, here are the details:</p>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0 0 10px; color: #333;"><strong>Time:</strong> ${loginDetails.time}</p>
        <p style="margin: 0 0 10px; color: #333;"><strong>IP Address:</strong> ${loginDetails.ip}</p>
        <p style="margin: 0; color: #333;"><strong>Device:</strong> ${loginDetails.device}</p>
      </div>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">If this login was not authorized by you, please change your password immediately and contact our support team.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://softpire.com/change-password" style="background: linear-gradient(135deg, #dc3545, #c82333); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; box-shadow: 0 4px 6px rgba(220,53,69,0.3);">Change Password</a>
      </div>
      <p style="color: #666; line-height: 1.6;">Stay secure with Softpire. Reach out to <a href="mailto:support@softpire.com" style="color: #dc3545;">support@softpire.com</a> for help.</p>
    </div>
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
      <p style="margin: 0; color: #666; font-size: 14px;">Best regards,<br>The Softpire Team</p>
      <p style="margin: 10px 0 0; color: #999; font-size: 12px;">© 2025 Softpire. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const emailVerificationSuccessEmail = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <title>Email Verification Successful - Softpire</title>
</head>
<body style="font-family: 'Roboto', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #28a745, #1e7e34); color: white; padding: 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Softpire</h1>
      <p style="margin: 10px 0 0; font-size: 16px;">Verified & Ready</p>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Email Verification Successful</h2>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Congratulations!</p>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Your email address has been successfully verified. You can now fully access your Softpire account and start exploring our services.</p>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Dive into innovation with Softpire – your gateway to cutting-edge solutions.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://softpire.com/dashboard" style="background: linear-gradient(135deg, #28a745, #1e7e34); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; box-shadow: 0 4px 6px rgba(40,167,69,0.3);">Go to Dashboard</a>
      </div>
      <p style="color: #666; line-height: 1.6;">Have questions? Our team is here to help at <a href="mailto:support@softpire.com" style="color: #28a745;">support@softpire.com</a>.</p>
    </div>
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
      <p style="margin: 0; color: #666; font-size: 14px;">Best regards,<br>The Softpire Team</p>
      <p style="margin: 10px 0 0; color: #999; font-size: 12px;">© 2025 Softpire. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const googleWelcomeEmail = (name) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <title>Welcome to Softpire - Google Sign Up</title>
</head>
<body style="font-family: 'Roboto', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #4285f4, #34a853); color: white; padding: 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Softpire</h1>
      <p style="margin: 10px 0 0; font-size: 16px;">Welcome Aboard</p>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Welcome to Softpire, ${name}!</h2>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Thank you for signing up with Softpire using your Google account! Your account has been successfully created and verified.</p>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">You can now access all our features and start your journey towards innovation and entrepreneurship.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://softpire.com/dashboard" style="background: linear-gradient(135deg, #4285f4, #34a853); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; box-shadow: 0 4px 6px rgba(66,133,244,0.3);">Get Started</a>
      </div>
      <p style="color: #666; line-height: 1.6;">If you have any questions or need assistance, feel free to contact our support team at <a href="mailto:support@softpire.com" style="color: #4285f4;">support@softpire.com</a>.</p>
    </div>
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
      <p style="margin: 0; color: #666; font-size: 14px;">Best regards,<br>The Softpire Team</p>
      <p style="margin: 10px 0 0; color: #999; font-size: 12px;">© 2025 Softpire. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const passwordSetConfirmationEmail = (name) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <title>Password Set Successfully - Softpire</title>
</head>
<body style="font-family: 'Roboto', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background: linear-gradient(135deg, #28a745, #1e7e34); color: white; padding: 30px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Softpire</h1>
      <p style="margin: 10px 0 0; font-size: 16px;">Password Set Successfully</p>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Password Set Successfully, ${name}!</h2>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">Your password has been successfully set for your Google account on Softpire.</p>
      <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">You can now log in using either your Google account or your email and password combination.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://softpire.com/login" style="background: linear-gradient(135deg, #28a745, #1e7e34); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block; box-shadow: 0 4px 6px rgba(40,167,69,0.3);">Log In Now</a>
      </div>
      <p style="color: #666; line-height: 1.6;">For any assistance, reach out to us at <a href="mailto:support@softpire.com" style="color: #28a745;">support@softpire.com</a>.</p>
    </div>
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
      <p style="margin: 0; color: #666; font-size: 14px;">Best regards,<br>The Softpire Team</p>
      <p style="margin: 10px 0 0; color: #999; font-size: 12px;">© 2025 Softpire. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = {
  passwordResetEmail,
  passwordResetSuccessEmail,
  emailVerificationEmail,
  loginAlertEmail,
  emailVerificationSuccessEmail,
  googleWelcomeEmail,
  passwordSetConfirmationEmail
};
