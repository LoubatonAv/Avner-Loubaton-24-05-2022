import React, { useState, useEffect } from 'react';
import { weatherService } from '../service/weather.service.js';
import { DayList } from '../cmps/DayList';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { utilService } from '../service/util.service';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../store/favorite.action';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const WeatherPage = () => {
  const [searchValue, setSearchValue] = useState(215854);
  const [weather, setWeather] = useState([]);
  const [results, setResults] = useState([]);
  const [metric, setMetric] = useState(true);
  const [cityInfo, setCityInfo] = useState(null);

  const onSearch = async (ev) => {
    const result = await weatherService.getLocationKey(ev.target.value);

    if (!result) return;
    setWeather(result);
  };

  const { cityId } = useParams();

  useEffect(() => {
    if (!cityId) return;
    onSubmitCity(cityId);
  }, [cityId]);

  useEffect(() => {
    onSubmitCity(searchValue);
  }, [searchValue]);

  const dispatch = useDispatch();

  weather.forEach((city) => {
    city.label = city.LocalizedName;
  });

  const handleChange = (ev) => {
    setSearchValue(ev.Key);
    setCityInfo(ev);
  };

  const onSubmitCity = async (searchValue) => {
    const city = await weatherService.getWeatherResults(searchValue);
    setResults(city);
  };

  const toggleMetric = () => {
    setMetric(!metric);
  };

  const addToFavorites = () => {
    dispatch(addFavorite(cityInfo));
  };

  const searchWithDebounce = utilService.debounce(onSearch, 300);

  return (
    <>
      <div>
        <Link to='/favorites'>
          <div>Favorites</div>
        </Link>
        <div className='weather-page main-layout'>
          <div className='top-side full'>
            <div>WeatherPage</div>
            <div className='text-container'></div>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              options={weather}
              clearOnBlur={false}
              onChange={(event, value) => handleChange(value)} // prints the selected value
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='City'
                  type='text'
                  placeholder='enter city'
                  onChange={searchWithDebounce}
                />
              )}
            />
            {/* <Button variant='contained' size='medium' onClick={() => onSubmitCity(searchValue)}>
              Submit
            </Button> */}
            <Button variant='contained' size='medium' onClick={toggleMetric}>
              {!metric ? 'Switch to metric' : 'Switch to Faranheit'}
            </Button>
            <Button variant='contained' size='small' onClick={addToFavorites}>
              Add favorite
            </Button>
          </div>

          <DayList results={results} metric={metric} weather={weather} />
        </div>
      </div>
      <div className='footer-container'>
        <section className='footer'>Footer</section>
      </div>
    </>
  );
};
