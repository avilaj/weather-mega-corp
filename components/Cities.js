import Link from 'next/link'
import axios from 'axios'

const Cities = (props) => (
  <div>
    <h1>Batman TV Shows</h1>
    <ul>
      {props.shows.map(({show}) => (
        <li key={show.id}>
          <Link as={`/${show.id}`} href={`/?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

Cities.getInitialProps = async function() {
  const { data } = await axios.get('https://api.tvmaze.com/search/shows?q=batman')
  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Cities;