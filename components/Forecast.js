import css from 'styled-jsx/css';
import { map, unless, compose, isNil } from 'ramda';

const forecastStyles = css`
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
`;

export default ({
    forecast
}) => (
    <div className='forecasting-container'>
        <style jsx>{forecastStyles}</style>
        <div className='sentence'>Also this week</div>
        <div className='forecasting-list'>
            {
                unless(isNil, map((day) => (
                    <div
                        key={day.date}
                        className='forecasting-item'
                    >
                        <img src={day.icon}/>
                        <div className='date'>{day.date}</div>
                        <div className='weather'>{day.weather}</div>
                    </div>
                )))(forecast)
            }
        </div>
    </div>
);