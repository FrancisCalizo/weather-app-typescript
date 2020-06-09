import React, { useEffect, useState } from 'react';

interface Props {
  forecasts: IForecasts;
}

const WeeklyForecast: React.FC<Props> = ({ forecasts }) => {
  const [weeklyForecasts, setWeeklyForecasts] = useState<IForecasts>(null);

  useEffect(() => {
    if (forecasts) {
      const days = [1, 2, 3, 4, 5];
      const fiveDayForecast = forecasts!.filter((forecast, idx) =>
        days.includes(idx)
      );

      setWeeklyForecasts(fiveDayForecast);
    }
  }, [forecasts]);

  return (
    <div>
      <p>Weekly Forecast</p>
    </div>
  );
};

export default WeeklyForecast;
