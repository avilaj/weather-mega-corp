import Link from 'next/link'
import axios from 'axios'
import {withRouter} from 'next/router';
import api from '../api/endpoints';

const Cities = (props) => (
  <div>
    <div>{props.url}</div>
    <h1>{ props.data.city }</h1>
    <h2>{ props.data.country }</h2>
    <ul>
      {props.cities.map((city) => (
        <li key={city.id}>
          <Link as={`/${city.id}`} href={`/?city=${city.id}`} prefetch>
            <a>{city.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

const getBaseUrl = req =>  req ? `${req.protocol}://${req.get('host')}`: '';

Cities.getInitialProps = async function(context) {
  let data = {};
  let baseUrl = '';
  const city = context.query.city || '';
  const url = `${baseUrl}/api/v1/city/${city}`;

  try {
    baseUrl = getBaseUrl(context.req);
    data = await axios.get(url);
    data = data.data;
  } catch (err) {
    console.log(err.message, url);
  }

  return {
    url,
    cities: [
        { id: 'avellaneda', name: 'Avellaneda' },
        { id: 'buenos-aires', name: 'Buenos Aires' },
        { id: 'london', name: 'London' },
    ],
    data
  }
}

export default withRouter(Cities);