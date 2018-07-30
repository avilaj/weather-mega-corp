export default ({
    forecast
}) => (
    <div className='forecasting-container'>
        <div className='sentence'>Also this week</div>
        <div className='forecasting-list'>
            {
                forecast.map(day => (
                    <div key={day.date} className='forecasting-item'>
                        <img src={day.icon}/>
                        <div className='date'>{day.date}</div>
                        <div className='weather'>{day.weather}</div>
                    </div>
                ))
            }
        </div>
        <style jsx>{`
            .forecasting-container {
                padding-bottom: 2rem;
            }
            .forecasting-list {
                display: flex;
                max-width: 100vw;
                overflow: auto;
            }
            .date {
                font-size: .75rem;
                margin-bottom: 0.25rem;
            }
            .sentence {
                color: #444;
                padding: 0 1rem;
            }
            .forecasting-item {
                padding: 1rem;
            }

        `}
        </style>
    </div>
);