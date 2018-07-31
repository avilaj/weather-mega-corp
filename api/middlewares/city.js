const { getLocationByIp } = require('../endpoints');
const { getClientIp } = require('request-ip');
const { either, path, pathOr, pipe, pipeP } = require('ramda');

/**
 * middleware to automatically pass user city when is needed
 * check is city has been sent as parameter
 * defaults to check city based on user ip
 * 
 * exposes city via locals
 */
const getCity = either(
	path(['params', 'city']),
	path(['query', 'city'])
);

const getIp = either(
	path(['query', 'ip']),
	getClientIp,
);

/**
 * promised pipe
 */
const resolveCityByIp = pipeP(
	pipe(
		getIp,
		getLocationByIp
	),
	pathOr('', ['city'])
);

const city = async (req, res, next) => {
	try {
		let city = getCity(req);
		if (!city) {
			// use ?ip=xxx.xxx.xxx to set your address if testing locally
			city = await resolveCityByIp(req);
		}

		res.locals.city = city.replace('-', ' ');
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = city;
