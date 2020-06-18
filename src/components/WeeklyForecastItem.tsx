import React from 'react';
import { getDay, format } from 'date-fns';

import useDayOfWeek from './hooks/useDayOfWeek';
import useFahrenheit from './hooks/useFahrenheit';

import clear from '../images/clear.png';
import cloudy from '../images/cloudy.png';
import drizzle from '../images/drizzle.png';
import fog from '../images/fog.png';
import overcast from '../images/overcast.png';
import partlyCloudy from '../images/partly-cloudy.png';
import rain from '../images/rain.png';
import sleet from '../images/sleet.png';
import snow from '../images/snow.png';
import thunderstorm from '../images/thunderstorm.png';

interface Props {
  forecast: Forecast;
}

const getIcon = (code: number) => {
  switch (true) {
    case code < 300:
      return thunderstorm;
    case code < 500:
      return drizzle;
    case code < 600:
      return rain;
    case code < 611:
      return snow;
    case code < 700:
      return sleet;
    case code < 800:
      return fog;
    case code === 800:
      return clear;
    case code === 801 || code === 802:
      return partlyCloudy;
    case code === 803:
      return cloudy;
    case code === 804:
      return overcast;
    case code === 900:
      return rain;
    default:
      return;
  }
};

const WeeklyForecastItem: React.FC<Props> = ({ forecast }) => {
  return (
    <div className="flex flex-row justify-between items-center text-center">
      <div>
        <span>{useDayOfWeek(getDay(new Date(forecast?.datetime!)))}</span>
        <span>{', '}</span>
        <span>
          {format(new Date(forecast?.datetime.replace(/-/g, '/')), 'MMM d')}
        </span>
      </div>
      <img
        src={getIcon(forecast?.weather.code)}
        alt={forecast?.weather.description}
        className="w-10"
      />
      <div>
        {useFahrenheit(forecast!.max_temp)}&#176;{'  '}
        {useFahrenheit(forecast!.min_temp)}&#176;
      </div>
    </div>
  );
};

export default WeeklyForecastItem;
