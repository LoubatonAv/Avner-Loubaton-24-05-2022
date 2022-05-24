import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DayList } from '../cmps/DayList';
import { onLoadFavorites } from '../store/favorite.action';
import { Link } from 'react-router-dom';

import { weatherService } from '../service/weather.service';

export const FavoritePage = () => {
  const [dailyForeCast, setDailyForeCast] = useState([]);
  const favorites = useSelector((state) => state?.favoriteModule?.favorites);

  useEffect(() => {
    const fetchData = async () => {
      const promises = favorites.map((city) => {
        return weatherService.getSingleForeCast(city);
      });
      const results = await Promise.all(promises);
      setDailyForeCast(results);
    };
    fetchData();
  }, [favorites]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onLoadFavorites());
  }, []);

  const url = `https://www.accuweather.com/images/weathericons/`;

  return (
    <div className='weather-page main-layout'>
      <Link to='/'>
        <div>Weather Page</div>
      </Link>
      <div className='favorite-name'>
        <div className='city-name'>
          {favorites.map((city) => (
            <Link className='clean-link' to={`/WeatherPage/${city.Key}`}>
              {city.LocalizedName}
            </Link>
          ))}
        </div>
        <div className='favorite'>
          {dailyForeCast.map((city) => (
            <div>
              <img className='favorite-img' src={url + city[0].Day.Icon + '.svg'} alt='pic'></img>
              <p className='forecast-info'>{city[0]?.Day.IconPhrase}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
