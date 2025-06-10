const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email template for OTP
const getOTPEmailTemplate = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset OTP</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #000000;
                color: #ffffff;
                padding: 30px;
                text-align: center;
            }
            .header h1 {
                font-size: 24px;
                font-weight: 600;
            }
            .content {
                padding: 40px 30px;
                text-align: center;
            }
            .content h2 {
                color: #000000;
                font-size: 20px;
                margin-bottom: 20px;
            }
            .content p {
                color: #666666;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .otp-container {
                background-color: #f8f9fa;
                border: 2px solid #e9ecef;
                border-radius: 8px;
                padding: 20px;
                margin: 30px 0;
            }
            .otp-code {
                font-size: 32px;
                font-weight: bold;
                color: #000000;
                letter-spacing: 8px;
                margin: 10px 0;
            }
            .otp-label {
                color: #666666;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .warning {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 4px;
                padding: 15px;
                margin: 20px 0;
                color: #856404;
                font-size: 14px;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 20px 30px;
                text-align: center;
                border-top: 1px solid #e9ecef;
            }
            .footer p {
                color: #666666;
                font-size: 14px;
                margin: 5px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Password Reset Request</h1>
            </div>
            <div class="content">
                <h2>Hello ${name || 'User'},</h2>
                <p>We received a request to reset your password. Use the OTP code below to complete your password reset:</p>
                
                <div class="otp-container">
                    <div class="otp-label">Your OTP Code</div>
                    <div class="otp-code">${otp}</div>
                </div>
                
                <div class="warning">
                    <strong>Important:</strong> This OTP will expire in 10 minutes. Do not share this code with anyone.
                </div>
                
                <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply to this email.</p>
                <p>&copy; 2025 Your App Name. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Send OTP email
const sendOTPEmail = async (email, name, otp) => {
  try {
    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset OTP - Your App',
      html: getOTPEmailTemplate(name, otp),
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

// Verify transporter configuration
const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('Email transporter is ready');
    return true;
  } catch (error) {
    console.error('Email transporter verification failed:', error);
    return false;
  }
};

module.exports = {
  sendOTPEmail,
  verifyTransporter,
};
