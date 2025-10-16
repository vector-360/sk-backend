const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter configuration (only if credentials are provided)
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter.verify((error, success) => {
    if (error) {
      console.error('Email transporter verification failed:', error.message);
      console.log('For Gmail, ensure you are using an App Password if 2FA is enabled. Enable "Less secure app access" or generate an App Password from your Google Account settings.');
    } else {
      console.log('Email transporter is ready to send messages');
    }
  });
} else {
  console.warn('Email credentials not provided. Email functionality will not work.');
}

module.exports = transporter;
