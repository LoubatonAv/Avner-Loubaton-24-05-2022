import axios from 'axios';
import { storageService } from './storage.service.js';

// const API_KEY = 'QcpDrn9rdnyGVrsSzedOzn6OPAuQ4ceq';
const API_KEY = '2zD6fid18cJ5kv9jpGmuds9Uor99TSQJ';
const STORAGE_KEY = 'weatherDB';
const STORAGE_FAVORITE_KEY = 'favoriteDB';

export const weatherService = {
  getWeatherResults,
  query,
  getLocationKey,
  addFavorite,
  celciusToFahr,
  loadFavorites,
  getSingleForeCast,
};

async function getSingleForeCast(value) {
  try {
    const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${value.Key}`, {
      params: {
        apikey: API_KEY,
        details: true,
        metric: true,
      },
    });

    const result = res.data.DailyForecasts;

    return result;
  } catch {
    console.log('cant get single forecast');
  }
}

async function getWeatherResults(search) {
  try {
    const res = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${search}`, {
      params: {
        apikey: API_KEY,
        language: 'en-us',
        details: true,
        metric: true,
      },
    });

    return res.data.DailyForecasts;
  } catch {
    console.log('cant get weather results');
  }
}

async function getLocationKey(value) {
  try {
    const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete`, {
      params: {
        apikey: API_KEY,
        q: value,
        language: 'en-us',
      },
    });

    const cityKey = res.data;
    return cityKey;
  } catch {
    console.log('cant get location');
  }
}

async function query() {
  try {
    return storageService.loadFromStorage(STORAGE_KEY);
  } catch (err) {
    console.log('Cannot get weather', err);
  }
}

function celciusToFahr(c) {
  const far = (c * 9) / 5 + 32;
  return far.toFixed(0);
}

async function addFavorite(favorite) {
  let favorites = _loadeFavoriteFromStorage();
  if (!favorites) favorites = [];
  const updatedFavorites = [...favorites, favorite];
  _saveFavoriteoStorage(updatedFavorites);
}

async function loadFavorites() {
  try {
    const favorites = await storageService.loadFromStorage(STORAGE_FAVORITE_KEY);
    return favorites;
  } catch (err) {
    console.log('cannot get favorites', err);
  }
}

function _saveFavoriteoStorage(weatherData) {
  storageService.saveToStorage(STORAGE_FAVORITE_KEY, weatherData);
}

function _loadeFavoriteFromStorage() {
  return storageService.loadFromStorage(STORAGE_FAVORITE_KEY);
}
