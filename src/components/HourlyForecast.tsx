import React from 'react';

import HourlyForecastItem from './HourlyForecastItem';

interface Props {
  hourlyForecasts: IHourlyForecast[];
}

const HourlyForecast: React.FC<Props> = ({ hourlyForecasts }) => {
  return (
    <div className="flex flex-row justify-between items-center mb-12">
      {hourlyForecasts.map((hourlyForecast, idx) => (
        <HourlyForecastItem key={idx} hourlyForecast={hourlyForecast} />
      ))}
    </div>
  );
};

export default HourlyForecast;
