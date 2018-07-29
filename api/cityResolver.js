const { getLocationByIp } = require('./endpoints');
const requestIp = require('request-ip');


const location = async (req, res, next) => {
	try {
		if (!req.params.city) {
			const result = await getLocationByIp(requestIp.getClientIp(req));
			req.params.city = result.city;
		}
		res.locals.city = req.params.city.replace('-', ' ');
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = location;
