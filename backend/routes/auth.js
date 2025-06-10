const express = require('express');
const passport = require('../config/passport');
const { authenticate } = require('../middleware/auth');
const { generateTokens } = require('../utils/jwt');
const {
  register,
  login,
  getMe,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword,
  registerValidation,
  loginValidation,
} = require('../controllers/authController');

const router = express.Router();

// Regular authentication routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', authenticate, getMe);
router.post('/logout', logout);

// Password reset routes
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      if (err) {
        console.error('Google OAuth error:', err);
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
      }
      
      if (!user) {
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
      }
      
      try {
        // Generate JWT tokens
        const { accessToken, refreshToken } = generateTokens(user);

        // Set cookies
        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Updated sameSite
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        };

        res.cookie('accessToken', accessToken, cookieOptions);
        res.cookie('refreshToken', refreshToken, {
          ...cookieOptions,
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        // Redirect to home page
        res.redirect(process.env.FRONTEND_URL || '/');
      } catch (error) {
        console.error('Google callback error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
      }
    })(req, res, next);
  }
);

module.exports = router;
