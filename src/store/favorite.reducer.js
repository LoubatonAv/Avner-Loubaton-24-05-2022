const initialState = {
  favorites: [],
};

export function favoriteReducer(state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case 'SET_FAVORITES':
      return (newState = { ...state, favorites: [...action.favorites] });
    case 'REMOVE_FAVORITE':
      return (newState = {
        ...state,
        favorites: state.favorites.filter((favorite) => favorite._id !== action.favoriteId),
      });
    case 'ADD_FAVORITE':
      return (newState = { ...state, favorites: [...state.favorites, action.favorite] });
    default:
      return newState;
  }
}
