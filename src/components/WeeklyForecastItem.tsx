import React, { useEffect, useState } from 'react';
import { getDay } from 'date-fns';

import CSS from 'csstype';

interface Props {
  forecast: IForecast;
}

const WeeklyForecastItem: React.FC<Props> = ({ forecast }) => {
  const [day, setDay] = useState<Day>('');

  useEffect(() => {
    // Get Day of Week Name From Number
    if (forecast) {
      switch (getDay(new Date(forecast?.datetime!))) {
        case 0:
          setDay('Sun');
          break;
        case 1:
          setDay('Mon');
          break;
        case 2:
          setDay('Tue');
          break;
        case 3:
          setDay('Wed');
          break;
        case 4:
          setDay('Thu');
          break;
        case 5:
          setDay('Fri');
          break;
        case 6:
          setDay('Sat');
          break;
        default:
          setDay('');
      }
    }
  }, []);

  return (
    <div style={styles}>
      <div>Date: {forecast?.datetime}</div>
      <div>Day of Week: {getDay(new Date(forecast?.datetime!))} </div>
      <div>Day of Week: {day} </div>
      <div>Forecast: {forecast?.weather.description}</div>
      <div>High: {Math.round(forecast!.max_temp * (9 / 5) + 32)}</div>
      <div>Low: {Math.round(forecast!.min_temp * (9 / 5) + 32)}</div>
    </div>
  );
};

const styles: CSS.Properties = {
  padding: `1rem`,
};

export default WeeklyForecastItem;
