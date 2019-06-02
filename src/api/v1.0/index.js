const express = require('express');

const login = require('../login');

const router = express.Router();

router.use('/auth', login);

module.exports = router;
