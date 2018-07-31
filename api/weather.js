const { getWeatherByCity } = require('./endpoints');

const weather = async (req, res, next) => {
	const city = res.locals.city;
	try {
		if (!city) throw new Error('City has not been resolved');
		const data = await getWeatherByCity(city);
		res.json(data);
	} catch (err) {
		if (err.response && err.response.status === 404) {
			res.status(404);
			res.json({ message: 'City not found' });
		} else {
			res.status(500);
      		next(err);
		}
	}
};

module.exports = weather;
