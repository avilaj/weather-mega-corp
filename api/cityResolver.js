const { getLocationByIp } = require('./endpoints');
const requestIp = require('request-ip');

const location = async (req, res, next) => {
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

module.exports = location;
