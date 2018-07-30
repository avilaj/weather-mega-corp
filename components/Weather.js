import css from 'styled-jsx/css';

const weatherStyles = css`
    .container {
        padding: 1rem;
    }
    .city,
    .weather {
        font-size: 2rem;
        color: purple;
    }
    .sentence {
        color: #444;
    }
    img {
        margin: 0;
        width: 5rem;
    }
`;

export default ({
    city,
    country,
    weather,
    icon
}) => (
    <div className='container'>
        <style jsx>{weatherStyles}
        </style>
        <img src={icon}/>
        <div className='sentence'>Today's weather is</div>
        <div className='weather'>{weather}</div>
        <div className='sentence'>for</div>
        <div className='city'>{ city }, <small>{country}</small></div>
    </div>
);