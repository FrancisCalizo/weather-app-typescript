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
      <div>Date: {forecast?.datetime}</div>
      <div>
        Date: {format(new Date(forecast?.datetime.replace(/-/g, '/')), 'MMM d')}
      </div>
      <div>
        Day of Week: {useDayOfWeek(getDay(new Date(forecast?.datetime!)))}{' '}
      </div>
      <div>Forecast: {forecast?.weather.description}</div>
      <div>High: {useFahrenheit(forecast!.max_temp)}</div>
      <div>Low: {useFahrenheit(forecast!.min_temp)}</div>
    </div>
  );
};

const styles: CSS.Properties = {
  padding: `1rem`,
};

export default WeeklyForecastItem;
