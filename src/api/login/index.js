const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('github'));

router.get(
  '/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    console.log('auth success', res);
    res.redirect('/about');
  }
);

module.exports = router;
