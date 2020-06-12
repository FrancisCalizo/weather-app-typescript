import React, { useEffect, useState } from 'react';
import { getDay, format } from 'date-fns';

import useDayOfWeek from './hooks/useDayOfWeek';
import useFahrenheit from './hooks/useFahrenheit';

interface Props {
  weatherData: WeatherData;
  forecasts: Forecasts;
  today: string;
}

const CurrentWeather: React.FC<Props> = ({ weatherData, forecasts, today }) => {
  const [todaysForecast, setTodaysForecast] = useState<Forecast>(
    {} as Forecast
  );

  // Get Projected Data
  useEffect(() => {
    const todaysCast = forecasts?.filter(
      (forecast) => forecast.valid_date === today
    );

    setTodaysForecast(todaysCast[0]);
  }, [forecasts, today, weatherData]);

  console.log(todaysForecast?.min_temp);
  return (
    <div>
      <div>{useFahrenheit(weatherData.temp)}&#176;</div>
      <div>{weatherData.weather?.description}</div>
      <div>Low:{useFahrenheit(todaysForecast?.min_temp)}</div>
      <div>High{useFahrenheit(todaysForecast?.max_temp)}</div>
      <div>ex:{todaysForecast?.min_temp}</div>
      <div>
        Date:
        {weatherData.ob_time &&
          format(
            new Date(weatherData.ob_time?.split(' ')[0].replace(/-/g, '/')),
            'MMM d'
          )}
      </div>
      <div>
        Day:{useDayOfWeek(getDay(new Date(weatherData.ob_time?.split(' ')[0])))}
      </div>
    </div>
  );
};

export default CurrentWeather;
