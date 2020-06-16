import React, { useEffect, useState } from 'react';
import { getDay, format } from 'date-fns';

import useDayOfWeek from './hooks/useDayOfWeek';
import useFahrenheit from './hooks/useFahrenheit';

interface Props {
  weatherData: WeatherData;
  forecasts: Forecasts;
  today: string;
  tomorrow: string;
  setWeatherData: (weatherData: WeatherData) => void;
}

const CurrentWeather: React.FC<Props> = ({
  weatherData,
  forecasts,
  today,
  tomorrow,
  setWeatherData,
}) => {
  const [todaysForecast, setTodaysForecast] = useState<Forecast>(
    {} as Forecast
  );

  // Get Projected Data
  useEffect(() => {
    let todaysCast;

    todaysCast = forecasts?.filter((forecast) => forecast.valid_date === today);

    if (todaysCast.length === 0) {
      todaysCast = forecasts?.filter(
        (forecast) => forecast.valid_date === tomorrow
      );

      setWeatherData({ ...weatherData, ob_time: tomorrow });
    }

    setTodaysForecast(todaysCast[0]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forecasts, today, tomorrow, setWeatherData]);

  return (
    <div className="text-center">
      <div>{weatherData.weather?.description}</div>
      <div className="flex flex-row justify-center items-center">
        <div className="text-6xl">{useFahrenheit(weatherData.temp)}&#176;</div>
        <div>
          <div>{useFahrenheit(todaysForecast?.max_temp)}&#176;</div>
          <hr />
          <div>{useFahrenheit(todaysForecast?.min_temp)}&#176;</div>
        </div>
      </div>
      <div>
        {useDayOfWeek(getDay(new Date(weatherData.ob_time?.split(' ')[0])))},{' '}
        {weatherData.ob_time &&
          format(
            new Date(weatherData.ob_time?.split(' ')[0].replace(/-/g, '/')),
            'MMM d'
          )}
      </div>
    </div>
  );
};

export default CurrentWeather;
