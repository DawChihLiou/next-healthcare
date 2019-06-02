const express = require('express');
const passport = require('../passport');
const Providers = require('../models/providers');

const router = express.Router();

router.get('/v1.0/auth', passport.authenticate('github'));

router.get(
  '/v1.0/auth/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.json(req.user);
  }
);

router.get('/v1.0/providers', (req, res) => {
  Providers.find({ providerState: 'AL' }, (err, providers) => {
    res.json(providers);
  });
});

module.exports = router;
