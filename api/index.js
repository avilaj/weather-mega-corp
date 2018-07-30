const express = require('express');
const router = express.Router();
const location = require('./location');
const weather = require('./weather');
const forecast = require('./forecast');
const ipBasedCity = require('./middlewares/city');
const errors = require('./middlewares/errors');

router.use(errors);

router.get('/location', ipBasedCity, location);
router.get('/city/:city?', ipBasedCity, weather);
router.get('/forecast/:city?', ipBasedCity, forecast);

module.exports = router;
