import React from 'react';
import { getDay, format } from 'date-fns';

import useDayOfWeek from './hooks/useDayOfWeek';
import useFahrenheit from './hooks/useFahrenheit';

import CSS from 'csstype';

interface Props {
  forecast: Forecast;
}

const WeeklyForecastItem: React.FC<Props> = ({ forecast }) => {
  return (
    <div style={styles}>
      <div>
        {useDayOfWeek(getDay(new Date(forecast?.datetime!)))}
        {', '}
        {format(new Date(forecast?.datetime.replace(/-/g, '/')), 'MMM d')}
      </div>
      <div>{forecast?.weather.description}</div>
      <div>
        {useFahrenheit(forecast!.max_temp)}&#176; |{' '}
        {useFahrenheit(forecast!.min_temp)}&#176;
      </div>
    </div>
  );
};

const styles: CSS.Properties = {
  padding: `1rem`,
};

export default WeeklyForecastItem;
