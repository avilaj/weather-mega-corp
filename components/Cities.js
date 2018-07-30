import Link from 'next/link'

const Cities = ({ cities }) => (
    <ul>
        {cities.map((city) => (
            <li key={city.id}>
                <Link as={`/${city.id}`} href={`/?city=${city.id}`}>
                    <a>{city.name}</a>
                </Link>
            </li>
        ))}
    </ul>
);

export default Cities;