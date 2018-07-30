import React from 'react';

export default ({
    city,
    country,
    weather
}) => (
    <div>
        <h1>{ city }, <span>{country}</span></h1>
        { weather.description }
    </div>
);