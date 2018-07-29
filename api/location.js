const requestIp = require('request-ip');
const location = async (req, res, next) => {
	try {
    const results = {
      city: res.locals.city,
      ip: requestIp.getClientIp(req),
    };
		res.json(results);
	} catch (err) {
		next(err);
	}
};

module.exports = location;
