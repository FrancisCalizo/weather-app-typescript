import React, { useEffect, useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Location from './components/Location';

function App() {
  const [weatherData, setWeatherData] = useState<IWeatherData>(null);
  const [forecasts, setForecasts] = useState<IForecasts>(null);
  const [city, setCity] = useState<string>('Miami');

  // Fetch Current Weather
  useEffect(() => {
    fetch(
      `https://api.weatherbit.io/v2.0/current?&city=${city}&country=US&key=${process.env.REACT_APP_WEATHER_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setWeatherData(res.data[0]);
      });
  }, [city]);

  // Fetch Forecast
  useEffect(() => {
    fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.REACT_APP_WEATHER_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setForecasts(res.data);
      });
  }, [city]);

  return (
    <div>
      <Location city={city} />
      <CurrentWeather weatherData={weatherData} forecasts={forecasts} />
    </div>
  );
}

export default App;
