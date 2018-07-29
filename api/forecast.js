const { getForecastByCity } = require('./endpoints');

const weather = async (req, res, next) => {
	const city = res.locals.city;
	if (!city) throw new Error('City has not been resolved');
	try {
		const data = await getForecastByCity(city);
		res.json(data);
	} catch (err) {
		if (err.response.status === 404) {
			res.status(404).json({ message: 'City not found' });
		} else {
			res.status(500);
      next(err);
		}
	}
};

module.exports = weather;
