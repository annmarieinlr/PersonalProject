//I changed this file to what Brother Birch had.

const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'))

module.exports = router;