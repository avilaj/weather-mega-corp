const axios = require('axios')
const { pick, applySpec, map, uniqBy, path, prop, compose, multiply } = require('ramda')

const format = require('date-fns/fp/format')
const toDate = require('date-fns/fp/toDate')

const openweatherParams = {
  units: 'metric',
  APPID: process.env.APPID
}

const urls = {
  ip: 'http://ip-api.com/json',
  weather: 'https://api.openweathermap.org/data/2.5/weather',
  forecast: 'https://api.openweathermap.org/data/2.5/forecast'
}

const formatDate = compose(
  format('EEEE'),
  toDate,
  multiply(1000)
)

const getIconUrl = id => `https://openweathermap.org/img/w/${id}.png`

const rollupForecast = applySpec({
  date: compose(formatDate, prop('dt')),
  weather: path(['weather', 0, 'main']),
  icon: compose(getIconUrl, path(['weather', 0, 'icon']))
})

const formatWeather = applySpec({
  city: prop('name'),
  country: path(['sys', 'country']),
  weather: path(['weather', '0', 'main']),
  icon: compose(getIconUrl, path(['weather', 0, 'icon'])),
  temperature: path(['main', '0', 'temp'])
})

const formatForecast = applySpec({
  city: path(['city', 'name']),
  country: path(['city', 'country']),
  forecast: compose(
    uniqBy(prop('date')),
    map(rollupForecast),
    path(['list'])
  )
})

const getLocationByIp = ip =>
  axios.get(`${urls.ip}/${ip}`).then(
    compose(
      pick(['city']),
      prop('data')
    )
  )

const getWeatherByCity = city =>
  axios
    .get(urls.weather, {
      params: { q: city, ...openweatherParams }
    })
    .then(
      compose(
        formatWeather,
        prop('data')
      )
    )

const getForecastByCity = city =>
  axios
    .get(urls.forecast, {
      params: { q: city, ...openweatherParams }
    })
    .then(
      compose(
        formatForecast,
        prop('data')
      )
    )

module.exports = {
  getLocationByIp,
  getWeatherByCity,
  getForecastByCity
}
