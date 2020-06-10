import React from 'react';
import CSS from 'csstype';

interface Props {
  forecast: IForecast;
}

const WeeklyForecastItem: React.FC<Props> = ({ forecast }) => {
  return (
    <div style={styles}>
      <div>Date: {forecast?.datetime}</div>
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
