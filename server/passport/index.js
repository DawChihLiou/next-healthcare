require('dotenv').config();

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const clientID =
  process.env.NODE_ENV === 'production'
    ? process.env.GITHUB_CLIENT_ID
    : process.env.DEV_GITHUB_CLIENT_ID;

const clientSecret =
  process.env.NODE_ENV === 'production'
    ? process.env.GITHUB_CLIENT_SECRET
    : process.env.DEV_GITHUB_CLIENT_SECRET;

passport.use(
  new GitHubStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: '/api/v1.0/auth/callback',
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        console.log('here', profile);
        return done(null, profile);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = passport;
