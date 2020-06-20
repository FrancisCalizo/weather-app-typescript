import React from 'react';
import { getDay } from 'date-fns';

import useDayOfWeek from './hooks/useDayOfWeek';
import useFahrenheit from './hooks/useFahrenheit';
import useWeatherIcon from './hooks/useWeatherIcon';

interface Props {
  forecast: Forecast;
}

const WeeklyForecastItem: React.FC<Props> = ({ forecast }) => {
  return (
    <div className="flex flex-row justify-between items-center text-base xs:text-base">
      <div className="w-1/3 text-left pl-3">
        <span>
          {useDayOfWeek(getDay(new Date(forecast?.datetime!)), 'long')}
        </span>
        {/* <span>{', '}</span> */}
        {/* <span>{format(new Date(forecast?.datetime.replace(/-/g, '/')), 'MMM dddd')}</span> */}
      </div>
      <div className="w-1/3 ">
        <img
          src={useWeatherIcon(forecast?.weather.code, 12)}
          alt={forecast?.weather.description}
          className="w-10 mx-auto"
        />
      </div>
      <div className="w-1/3 text-right pr-3">
        {useFahrenheit(forecast!.max_temp)}&#176;{'  '}
        <span className="text-gray-600 ml-1">
          {useFahrenheit(forecast!.min_temp)}&#176;
        </span>
      </div>
    </div>
  );
};

export default WeeklyForecastItem;
