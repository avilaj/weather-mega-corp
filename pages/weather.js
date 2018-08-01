/* global location */

import axios from 'axios'
import {withRouter} from 'next/router'
import css from 'styled-jsx/css'
import Weather from '../components/Weather'
import Cities from '../components/Cities'
import Forecast from '../components/Forecast'
import ProgressBar from '../components/ProgressBar'
import Search from '../components/Search'

const globalStyles = css`
  body {
    margin: 0;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
  }
`

const weatherPageStyles = css`
  .container {
    display: flex;
    flex-flow: column;
    max-width: 500px;
    margin: auto;
  }
  .weather-content {
    flex: 1
  }
`

const WeatherPage = ({ weather, forecast, cities }) => (
  <div className='container'>
    <style global jsx>{globalStyles}</style>
    <style jsx>{weatherPageStyles}</style>
    <ProgressBar />
    <Search />
    <Cities {...{ cities }} />
    <div className='weather-content'>
      <Weather {...weather} />
    </div>
    <Forecast {...forecast} />
  </div>
)
/**
 * Here we are going to make isomorphic request on backend and frontend
 * added a small check for properly setting api url.
 */

WeatherPage.getInitialProps = async function (context) {
  let data = {}
  const city = context.query.city
  const { req } = context
  const baseUrl = req ? `${req.protocol}://${req.get('host')}` : `${location.protocol}//${location.host}`
  const weatherUrl = `${baseUrl}/api/v1/city/${city}`
  const forecastUrl = `${baseUrl}/api/v1/forecast/${city}`

  try {
    data = await Promise.all([
      axios.get(weatherUrl),
      axios.get(forecastUrl)
    ])

    data = {
      weather: data[0].data,
      forecast: data[1].data
    }
  } catch (err) {
    console.log(err.message, context.url)
  }

  return {
    cities: [
        { id: 'bogota', name: 'Bogota' },
        { id: 'singapur', name: 'Singapur' },
        { id: 'melbourne', name: 'Melbourne' },
        { id: 'rome', name: 'Rome' },
        { id: 'london', name: 'London' }
    ],
    ...data
  }
}

export default withRouter(WeatherPage)
