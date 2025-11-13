const crypto = require('crypto');

// Generate OTP
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

module.exports = {
  generateOtp
};
