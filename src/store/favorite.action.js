import { weatherService } from '../service/weather.service';

export function onLoadFavorites() {
  return (dispatch, getState) => {
    weatherService.loadFavorites().then((favorites) => {
      const action = { type: 'SET_FAVORITES', favorites };
      dispatch(action);
    });
  };
}

export function removeFavorite(movie) {
  const id = movie.id;
  return (dispatch, getState) => {
    weatherService.removeFavorite(id).then(() => {
      const action = { type: 'REMOVE_FAVORITE', id };
      dispatch(action);
    });
  };
}

export function addFavorite(favorite) {
  return (dispatch, getState) => {
    weatherService.addFavorite(favorite).then(() => {
      const action = { type: 'ADD_FAVORITE', favorite };
      dispatch(action);
    });
  };
}
