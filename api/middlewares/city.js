const { getLocationByIp } = require('../endpoints');
const requestIp = require('request-ip');

/**
 * middleware to automatically pass user city when is needed
 * check is city has been sent as parameter
 * defaults to check city based on user ip
 * 
 * exposes city via locals
 */
const city = async (req, res, next) => {
	try {
		let city = req.params.city || req.query.city;
		if (!city) {
			// use ?ip=xxx.xxx.xxx to set your address if testing locally
			const ip = req.query.ip || requestIp.getClientIp(req);
			const result = await getLocationByIp(ip);
			city = result.city;
		}

		res.locals.city = (city || '').replace('-', ' ');
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = city;
