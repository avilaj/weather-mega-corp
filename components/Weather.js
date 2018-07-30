import React from 'react';

export default ({
    city,
    country,
    weather,
    icon
}) => (
    <div>
        <h1>{ city }, <span>{country}</span></h1>
        {weather}
        <br />
        <img src={icon}/>
        <br />
    </div>
);