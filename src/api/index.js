const express = require('express');

const v1 = require('./v1.0');

const router = express.Router();

router.use('/v1.0', v1);

module.exports = router;
