export default ({
    forecast
}) => (
    <div>
        <strong>Forecasting</strong>
        {
            forecast.map(day => (
                <div key={day.date}>
                    {day.date}
                    <br />
                    {day.weather}
                    <br />
                    <img src={day.icon}/>
                    <br />
                </div>
            ))
        }
    </div>
);