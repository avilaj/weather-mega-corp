const express = require('express');
const router = express.Router();
const location = require('./location');
const weather = require('./weather');
const forecast = require('./forecast');
const cityResolver = require('./cityResolver');
const errors = require('./errors');
router.use(errors);
router.get('/location', cityResolver, location);
router.get('/city/:city?', cityResolver, weather);
router.get('/forecast/:city?', cityResolver, forecast);

module.exports = router;
