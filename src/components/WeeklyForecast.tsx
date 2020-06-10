import React, { useEffect, useState } from 'react';
import CSS from 'csstype';

import WeeklyForecastItem from './WeeklyForecastItem';

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
    <div style={styles}>
      {weeklyForecasts?.map((forecast) => (
        <WeeklyForecastItem forecast={forecast} />
      ))}
    </div>
  );
};

const styles: CSS.Properties = {
  display: 'flex',
};

export default WeeklyForecast;
