import dayjs from 'dayjs';
import { weatherService } from '../service/weather.service';

export const DayPreview = ({ day, metric }) => {
  const url = `https://www.accuweather.com/images/weathericons/`;
  return (
    <div className='weather-card-container'>
      <article className='weather-card'>
        <img className='img' src={url + day.Day.Icon + '.svg'} alt='pic'></img>
        <h1 className='date'>{dayjs(day.Date).format('DD/MM/YYYY')}</h1>
        <p className='short-phrase'>{day.Day.ShortPhrase}</p>
        <p className='date'>{day.Day.IconPhrase}</p>
        {metric ? (
          <p className='date'>
            {day.Temperature.Minimum.Value} C -{day.Temperature.Maximum.Value} C
          </p>
        ) : (
          <p className='date'>
            {weatherService.celciusToFahr(day.Temperature.Minimum.Value)} F -
            {weatherService.celciusToFahr(day.Temperature.Maximum.Value)} F
          </p>
        )}
      </article>
    </div>
  );
};

// https://day.js.org/docs/en/display/format
