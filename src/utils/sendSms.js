const twilio = require('twilio');

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Send OTP SMS
const sendOtpSms = async (phoneNumber, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your verification code is: ${otp}. This code will expire in 10 minutes.`,
      from: twilioPhoneNumber,
      to: phoneNumber
    });

    console.log('SMS sent successfully:', message.sid);
    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Failed to send SMS');
  }
};

module.exports = {
  sendOtpSms
};
