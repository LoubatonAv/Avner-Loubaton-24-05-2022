import { FavoritePage } from './pages/FavoritePage';
import { WeatherPage } from './pages/WeatherPage';

export const routes = [
  {
    path: '/',
    component: WeatherPage,
  },
  {
    path: '/favorites',
    component: FavoritePage,
  },
  {
    path: '/WeatherPage/:cityId',
    component: WeatherPage,
  },
];
