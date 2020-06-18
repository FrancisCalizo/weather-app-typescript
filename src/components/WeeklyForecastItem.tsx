import React from 'react';
import { getDay, format } from 'date-fns';

import useDayOfWeek from './hooks/useDayOfWeek';
import useFahrenheit from './hooks/useFahrenheit';
import useWeatherIcon from './hooks/useWeatherIcon';

interface Props {
  forecast: Forecast;
}

const WeeklyForecastItem: React.FC<Props> = ({ forecast }) => {
  return (
    <div className="flex flex-row justify-between items-center text-center text-base xs:text-base">
      <div>
        <span>
          {useDayOfWeek(getDay(new Date(forecast?.datetime!)), 'long')}
        </span>
        {/* <span>{', '}</span> */}
        {/* <span>{format(new Date(forecast?.datetime.replace(/-/g, '/')), 'MMM dddd')}</span> */}
      </div>
      <img
        src={useWeatherIcon(forecast?.weather.code)}
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
