import css from 'styled-jsx/css'
import Icon from './Icon';

const weatherStyles = css`
  .container {
    padding: 1rem;
  }
  .city,
  .weather {

  }
  .sentence {
    color: #444;
  }
  .icon {
    margin: 0;
    font-size: 5rem;
  }
  .temperature {
    font-size: 5rem;
  }
  .weather-display {
    display: flex;
    flex-flow: row;
    align-items: center;
  }
`

export default ({
  city,
  country,
  weather,
  temperature,
  icon
}) => (
  <div className='container'>
    <style jsx>{weatherStyles}</style>
    <div className='sentence'>Today's weather is</div>
    <div className='weather-display'>
      <div className='icon'>
        <Icon code={icon} />
      </div>
      <div className='temperature'>
        {temperature}
        <super>°</super>
      </div>
    </div>
    <span className='weather'>{weather}</span> {' '}
    <span className='sentence'>for</span> {' '}
    <span className='city'>{ city }, <small>{country}</small></span>
  </div>
)
