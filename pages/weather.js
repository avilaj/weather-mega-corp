import Link from 'next/link'
import axios from 'axios'
import {withRouter} from 'next/router';
import Weather from '../components/Weather';

const Cities = ({ data, cities }) => (
  <div>
    <Weather {...data }/>
    <ul>
      {cities.map((city) => (
        <li key={city.id}>
          <Link as={`/${city.id}`} href={`/?city=${city.id}`} prefetch>
            <a>{city.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

Cities.getInitialProps = async function(context) {
  let data = {};
  const city = context.query.city;
  const url = `${context.query.baseUrl}/api/v1/city/${city}`;

  try {
    data = await axios.get(url);
    data = data.data;
  } catch (err) {
    console.log(err.message, url);
  }

  return {
    cities: [
        { id: 'avellaneda', name: 'Avellaneda' },
        { id: 'buenos-aires', name: 'Buenos Aires' },
        { id: 'london', name: 'London' },
    ],
    data
  }
}

export default withRouter(Cities);