import axios from 'axios'
import {withRouter} from 'next/router';
import Head from 'next/head'
import Weather from '../components/Weather';
import Cities from '../components/Cities';
import Forecast from '../components/Forecast';
import ProgressBar from '../components/ProgressBar';

const WeatherPage = ({ weather, forecast, cities }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, user-scalable=no" />
    </Head>
    <ProgressBar />
    <style global jsx> {`
      body {
        margin: 0;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 16px;
      }
    `}
    </style>
    <Cities { ...{ cities } }/>
    <div className='content'>
      <Weather {...weather }/>
    </div>
    <Forecast {...forecast }/>
    <style jsx>{`
      div {
        display: flex;
        flex-flow: column;
        height: 100vh;
      }
      .content {
        flex: 1
      }
    `}
    </style>
  </div>
)

WeatherPage.getInitialProps = async function(context) {
  let data = {};
  const city = context.query.city;
  const baseUrl = context.query.baseUrl || `${location.protocol}//${location.host}`
  const weatherUrl = `${baseUrl}/api/v1/city/${city}`;
  const forecastUrl = `${baseUrl}/api/v1/forecast/${city}`;
  console.log('request');
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
        { id: 'singapur', name: 'Singapur' },
        { id: 'melbourne', name: 'Melbourne' },
        { id: 'rome', name: 'Rome' },
        { id: 'london', name: 'London' },
    ],
    ...data
  }
}

export default withRouter(WeatherPage);