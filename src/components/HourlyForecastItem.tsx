import React from 'react';
import { format } from 'date-fns';

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
  hourlyForecast: IHourlyForecast;
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

const HourlyForecastItem: React.FC<Props> = ({ hourlyForecast }) => {
  return (
    <div className="flex flex-col text-center">
      <div>{format(new Date(hourlyForecast.timestamp_local), 'haa')}</div>
      <div>
        <img
          className="w-10"
          src={getIcon(hourlyForecast.weather.code)}
          alt={hourlyForecast.weather.description}
        />
      </div>
      <div>{useFahrenheit(hourlyForecast.temp)}&#176;</div>
    </div>
  );
};

export default HourlyForecastItem;
