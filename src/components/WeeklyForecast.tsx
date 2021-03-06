import React, { useEffect, useState } from 'react';

import WeeklyForecastItem from './WeeklyForecastItem';

interface Props {
  forecasts: Forecasts;
}

const WeeklyForecast: React.FC<Props> = ({ forecasts }) => {
  const [weeklyForecasts, setWeeklyForecasts] = useState<Forecasts>([]);

  useEffect(() => {
    const days = [1, 2, 3, 4, 5];
    const fiveDayForecast = forecasts!.filter((forecast, idx) =>
      days.includes(idx)
    );

    setWeeklyForecasts(fiveDayForecast);
  }, [forecasts]);

  return (
    <div className="mx-2 mt-2 rounded-lg bg-white text-black py-2 shadow-2x border-2 border-gray-300 opacity-90">
      {weeklyForecasts?.map((forecast, idx) => (
        <WeeklyForecastItem key={idx} forecast={forecast} />
      ))}
    </div>
  );
};

export default WeeklyForecast;
