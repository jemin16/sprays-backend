const sendEmail = require('./sendEmail');

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPEmail = async (email, otp) => {
    const subject = 'Your OTP Code';
    const html = `
    <p>Your OTP code is: <b>${otp}</b></p>
    <p>This code is valid for 10 minutes.</p>
    `;

    await sendEmail(email, subject, html);
};

module.exports = { generateOTP, sendOTPEmail };
