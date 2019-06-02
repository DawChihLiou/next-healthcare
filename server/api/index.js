const express = require('express');
const passport = require('../passport');

const router = express.Router();

router.get('/v1.0/auth', passport.authenticate('github'));

router.get(
  '/v1.0/auth/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.json(req.user);
  }
);

module.exports = router;
