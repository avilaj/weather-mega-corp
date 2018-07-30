import css from 'styled-jsx/css';
import Link from 'next/link';

const citiesStyles = css`
    .sentence {
        color: #444;
    }
    .cities {
        padding: 1rem;
    }
    ul {
        padding: 0;
    }
    li {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: inline-block;
    }

    a {
        color: purple;
        text-decoration: none;
    }
    li+li:before {
        content: ", "
    }
`;

const Cities = ({ cities }) => (
    <div className='cities'>
        <div className="sentence">Look the weather at one of these cities</div>
        <ul>
            {cities.map((city) => (
                <li key={city.id}>
                    <Link as={`/${city.id}`} href={`/weather?city=${city.id}`}>
                        <a>{city.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
        <style jsx>{citiesStyles}
        </style>
    </div>
);

export default Cities;