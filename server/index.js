require('dotenv').config();

const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/v1.0/auth/callback',
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log('user profile', profile);
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const router = require('../src/api');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  })
  .then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use('/api', router);
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(
      require('express-session')({
        secret: 'nexthealthcare',
        resave: true,
        saveUninitialized: true,
      })
    );

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log('Server is listening to port', port);
    });
  });
