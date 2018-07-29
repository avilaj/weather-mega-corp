const axios = require('axios');
const { pick, applySpec, map, evolve, path, prop, compose } = require('ramda');
const { openweathermap_key } = require('../config');
const urls = {
	ip: 'http://ip-api.com/json',
	weather: 'https://api.openweathermap.org/data/2.5/weather',
	forecast: 'https://api.openweathermap.org/data/2.5/forecast'
};

// formats weather
const rollupWeather = applySpec({
	temperature: path(['main', 'temp']),
	min: path(['main', 'temp_min']),
	max: path(['main', 'temp_max']),
	description: path(['weather', '0', 'main'])
});

const formatWeather = applySpec({
	city: prop('name'),
	country: path(['sys', 'country']),
	weather: rollupWeather
});

const formatForecast = compose(
	applySpec({
		city: path(['city', 'name']),
		country: path(['city', 'country']),
		list: prop('list')
	}),
	evolve({ list: map(rollupWeather) })
);

const getLocationByIp = ip =>
	axios.get(`${urls.ip}/${ip}`).then(
		compose(
			pick(['city']),
			prop('data')
		)
	);

const getWeatherByCity = city =>
	axios
		.get(urls.weather, {
			params: { units: 'metrics', q: city, APPID: openweathermap_key }
		})
		.then(
			compose(
				formatWeather,
				prop('data')
			)
		);

const getForecastByCity = city =>
	axios
		.get(urls.forecast, {
			params: { units: 'metrics', q: city, APPID: openweathermap_key }
		})
		.then(
			compose(
				formatForecast,
				prop('data')
			)
		);

module.exports = {
	getLocationByIp,
	getWeatherByCity,
	getForecastByCity
};
