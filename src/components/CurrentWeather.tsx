import React, { useEffect, useState } from 'react';

interface Props {
  weatherData: WeatherData;
  forecasts: Forecasts;
  today: string;
}

const CurrentWeather: React.FC<Props> = ({ weatherData, forecasts, today }) => {
  const [temperature, setTemperature] = useState(0);
  const [todaysForecast, setTodaysForecast] = useState<Forecast>(
    {} as Forecast
  );
  const [low, setLow] = useState<number>(0);
  const [high, setHigh] = useState<number>(0);

  // Get Current Conditions
  useEffect(() => {
    if (weatherData) {
      let tempInFarenheight = Math.round(weatherData.temp * (9 / 5) + 32);
      setTemperature(tempInFarenheight);
    }
  }, [weatherData]);

  // Get Projected Data
  useEffect(() => {
    if (forecasts) {
      const todaysCast = forecasts?.filter(
        (forecast) => forecast.valid_date === today
      );

      setTodaysForecast(todaysCast[0]);
    }
  }, [forecasts, today]);

  // Set Low and High Temperature
  useEffect(() => {
    if (todaysForecast) {
      let todaysLow = Math.round(todaysForecast!.min_temp * (9 / 5) + 32);
      let todaysHigh = Math.round(todaysForecast!.max_temp * (9 / 5) + 32);

      setLow(todaysLow);
      setHigh(todaysHigh);
    }
  }, [todaysForecast]);

  return (
    <div>
      <div>{temperature}&#176;</div>
      <div>{weatherData.weather?.description}</div>
      <div>Low:{low}</div>
      <div>Low:{high}</div>
      <div>Day:{weatherData.ob_time?.split(' ')[0]}</div>
    </div>
  );
};

export default CurrentWeather;
