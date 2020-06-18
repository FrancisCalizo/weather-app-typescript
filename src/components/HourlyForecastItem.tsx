import React from 'react';
import { format } from 'date-fns';

import useFahrenheit from './hooks/useFahrenheit';
import useWeatherIcon from './hooks/useWeatherIcon';

interface Props {
  hourlyForecast: IHourlyForecast;
}

const HourlyForecastItem: React.FC<Props> = ({ hourlyForecast }) => {
  return (
    <div className="flex flex-col text-center text-sm xs:text-base ">
      <div>{format(new Date(hourlyForecast.timestamp_local), 'haa')}</div>
      <div>
        <img
          className="w-20"
          src={useWeatherIcon(hourlyForecast.weather.code)}
          alt={hourlyForecast.weather.description}
        />
      </div>
      <div>{useFahrenheit(hourlyForecast.temp)}&#176;</div>
    </div>
  );
};

export default HourlyForecastItem;
