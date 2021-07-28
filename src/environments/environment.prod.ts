import { apiKeys } from "./apikey";

export const environment = {
  production: false,
  apiBaseUrl: 'http://geoapi.heartrails.com/api/json?',
  weatherUrlBase: 'https://api.openweathermap.org/data/2.5/weather?lang=ja&',
  dailyOneCallUrl: 'https://api.openweathermap.org/data/2.5/onecall?lang=ja&exclude=hourly,current,minutely,alerts&',
  hourlyOneCallUrl: 'https://api.openweathermap.org/data/2.5/onecall?lang=ja&exclude=daily,current,minutely,alerts&',
  ...apiKeys,
};

