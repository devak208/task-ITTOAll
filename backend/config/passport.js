const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { prisma } = require('../config/database');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.APP_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this Google ID
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with the same email
        user = await prisma.user.findUnique({
          where: { email: profile.emails[0].value },
        });

        if (user) {
          // Link Google account to existing user
          user = await prisma.user.update({
            where: { id: user.id },
            data: {
              googleId: profile.id,
              avatar: profile.photos[0]?.value || user.avatar,
              name: user.name || profile.displayName,
            },
          });
          return done(null, user);
        }

        // Create new user
        user = await prisma.user.create({
          data: {
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            avatar: profile.photos[0]?.value,
            isVerified: true,
          },
        });        return done(null, user);
      } catch (error) {
        console.error('Google OAuth error:', error);
        return done(error, null);
      }
    }
  )
);

// Remove serialize/deserialize since we're not using sessions
// passport.serializeUser and passport.deserializeUser are not needed
// when using JWT tokens instead of sessions

module.exports = passport;
