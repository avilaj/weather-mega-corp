import axios from 'axios'
import {withRouter} from 'next/router';
import Weather from '../components/Weather';
import Cities from '../components/Cities';
import Forecast from '../components/Forecast';

const WeatherPage = ({ weather, forecast, cities }) => (
  <div>
    <Weather {...weather }/>
    <Forecast {...forecast }/>
    <Cities { ...{ cities } }/>
  </div>
)

WeatherPage.getInitialProps = async function(context) {
  let data = {};
  const city = context.query.city;
  const weatherUrl = `${context.query.baseUrl}/api/v1/city/${city}`;
  const forecastUrl = `${context.query.baseUrl}/api/v1/forecast/${city}`;

  try {
    data = await Promise.all([
      axios.get(weatherUrl),
      axios.get(forecastUrl),
    ]);

    data = {
      weather: data[0].data,
      forecast: data[1].data,
    }

  } catch (err) {
    console.log(err.message, url);
  }

  return {
    cities: [
        { id: 'bogota', name: 'Bogota' },
        { id: 'rome', name: 'Rome' },
        { id: 'london', name: 'London' },
    ],
    ...data
  }
}

export default withRouter(WeatherPage);