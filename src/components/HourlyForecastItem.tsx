import React from 'react';
import { format, getHours } from 'date-fns';

import useFahrenheit from './hooks/useFahrenheit';
import useWeatherIcon from './hooks/useWeatherIcon';

interface Props {
  hourlyForecast: IHourlyForecast;
}

const HourlyForecastItem: React.FC<Props> = ({ hourlyForecast }) => {
  return (
    <div className="flex flex-col text-center text-sm xs:text-base w-1/6">
      <div>{format(new Date(hourlyForecast.timestamp_local), 'haa')}</div>
      <div>
        <img
          className="w-16 mx-auto"
          src={useWeatherIcon(
            hourlyForecast.weather.code,
            getHours(new Date(hourlyForecast.timestamp_local))
          )}
          alt={hourlyForecast.weather.description}
        />
      </div>
      <div>{useFahrenheit(hourlyForecast.temp)}&#176;</div>
    </div>
  );
};

export default HourlyForecastItem;
