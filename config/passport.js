const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,

      // Must match the Callback URL configured in GitHub OAuth App
      callbackURL: 'https://artisan-api-l6ei.onrender.com/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// Store user information in session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Retrieve user information from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;