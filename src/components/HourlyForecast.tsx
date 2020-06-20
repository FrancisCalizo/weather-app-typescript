import React from 'react';

import HourlyForecastItem from './HourlyForecastItem';

interface Props {
  hourlyForecasts: IHourlyForecast[];
}

const HourlyForecast: React.FC<Props> = ({ hourlyForecasts }) => {
  return (
    <div className="flex flex-row justify-between items-center py-8 bg-gray-400 bg-opacity-25">
      {hourlyForecasts.map((hourlyForecast, idx) => (
        <HourlyForecastItem key={idx} hourlyForecast={hourlyForecast} />
      ))}
    </div>
  );
};

export default HourlyForecast;
