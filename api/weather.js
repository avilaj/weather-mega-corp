const { getWeatherByCity } = require('./endpoints');

const weather = async (req, res, next) => {
	try {
		const city = res.locals.city;
		if (!city) throw new Error('City has not been resolved');
		const data = await getWeatherByCity(city);
		res.json(data);
	} catch (err) {
		next(err);
	}
};

module.exports = weather;
