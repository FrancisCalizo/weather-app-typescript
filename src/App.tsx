import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import CurrentWeather from './components/CurrentWeather';
import Location from './components/Location';
import SearchBar from './components/SearchBar';
import WeeklyForecast from './components/WeeklyForecast';

function App() {
  const [today, setToday] = useState('');
  const [location, setLocation] = useState({
    city: 'Miami',
    state: 'FL',
    country: 'US',
  });
  const [weatherData, setWeatherData] = useState<WeatherData>(
    {} as WeatherData
  );
  const [forecasts, setForecasts] = useState<Forecasts>([]);
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
          return res.json();
        }
      })
      .then((res) => {
        setWeatherData(res.data[0]);
        setLocation({
          city: res.data[0].city_name.toLowerCase(),
          state: res.data[0].state_code,
          country: res.data[0].country_code,
        });
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

  if (Object.keys(weatherData).length === 0) {
    return <h2>Loading...</h2>;
  } else {
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
        <WeeklyForecast forecasts={forecasts} />
      </div>
    );
  }
}

export default App;
