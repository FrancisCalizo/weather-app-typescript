import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import CurrentWeather from './components/CurrentWeather';
import Location from './components/Location';
import SearchBar from './components/SearchBar';

function App() {
  const [today, setToday] = useState('');
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<IWeatherData>(null);
  const [forecasts, setForecasts] = useState<IForecasts>(null);
  const [searchCity, setSearchCity] = useState<string>('Miami');
  const [searchInput, setSearchInput] = useState('');

  // Get Today's Date
  useEffect(() => {
    setToday(format(new Date(), 'yyyy-MM-dd'));
  }, []);

  // Fetch Current Weather
  useEffect(() => {
    fetch(
      `https://api.weatherbit.io/v2.0/current?&city=${searchCity}&country=US&key=${process.env.REACT_APP_WEATHER_KEY}`
    )
      .then((res) => {
        if (res.status === 200) {
          setLocation(searchCity);
          return res.json();
        }
      })
      .then((res) => {
        setWeatherData(res.data[0]);
      })
      .catch((err) => {
        alert(`Unable to find location "${searchCity}"`);
      });
  }, [searchCity]);

  // Fetch Forecast
  useEffect(() => {
    fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchCity}&country=US&key=${process.env.REACT_APP_WEATHER_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setForecasts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [searchCity]);

  return (
    <div>
      <Location location={location} />
      <CurrentWeather
        weatherData={weatherData}
        forecasts={forecasts}
        today={today}
      />
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchCity={setSearchCity}
      />
    </div>
  );
}

export default App;
