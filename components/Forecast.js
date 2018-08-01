import css from 'styled-jsx/css'
import { map, unless, isNil } from 'ramda'
import Icon from './Icon'

const forecastStyles = css`
  .forecasting-container {
    padding-bottom: 2rem;
  }
  .forecasting-list {
    display: flex;
    max-width: 100vw;
    overflow: auto;
    text-align: center;
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
  .icon {
    font-size: 2rem;
  }
`

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
            <div className='icon'>
              <Icon code={day.icon} />
            </div>
            <div className='date'>{day.date}</div>
            <div className='weather'>{day.weather}</div>
          </div>
        )))(forecast)
      }
    </div>
  </div>
)
