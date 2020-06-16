import React from 'react';
import { getDay, format } from 'date-fns';
import CSS from 'csstype';

import useDayOfWeek from './hooks/useDayOfWeek';
import useFahrenheit from './hooks/useFahrenheit';

import clear from '../images/clear.png';
import cloudy from '../images/cloudy.png';
import drizzle from '../images/drizzle.png';
import fog from '../images/fog.png';
import overcast from '../images/overcast.png';
import partlyCloudy from '../images/partly-cloudy.png';
import sleet from '../images/sleet.png';
import snow from '../images/snow.png';
import thunderstorm from '../images/thunderstorm.png';

interface Props {
  forecast: Forecast;
}

const WeeklyForecastItem: React.FC<Props> = ({ forecast }) => {
  console.log(forecast?.weather.code);
  return (
    <div style={styles} className="text-center">
      <div>
        {useDayOfWeek(getDay(new Date(forecast?.datetime!)))}
        {', '}
        {format(new Date(forecast?.datetime.replace(/-/g, '/')), 'MMM d')}
      </div>
      <img src={thunderstorm} alt={forecast?.weather.description} />
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
