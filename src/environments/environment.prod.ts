import { apiKeys } from "./apikey";

export const environment = {
  production: false,
  apiBaseUrl: 'http://geoapi.heartrails.com/api/json?',
  weatherUrlBase: 'https://api.openweathermap.org/data/2.5/weather?lang=ja&',
  ...apiKeys,
};

