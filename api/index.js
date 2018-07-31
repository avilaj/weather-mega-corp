const express = require('express');
const router = express.Router();
const location = require('./location');
const weather = require('./weather');
const forecast = require('./forecast');
const ipBasedCity = require('./middlewares/city');
const errors = require('./middlewares/errors');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    origin: process.env.SELF_URL,
    optionsSuccessStatus: 200
};

router.use(cors(corsOptions))
router.use(bodyParser.json());
router.use(errors);

router.get('/location', ipBasedCity, location);
router.get('/city/:city?', ipBasedCity, weather);
router.get('/forecast/:city?', ipBasedCity, forecast);

module.exports = router;
