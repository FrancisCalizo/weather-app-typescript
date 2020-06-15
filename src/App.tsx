import React, { useEffect, useState } from 'react';
import { format, add } from 'date-fns';

import CurrentWeather from './components/CurrentWeather';
import Location from './components/Location';
import SearchBar from './components/SearchBar';
import WeeklyForecast from './components/WeeklyForecast';
import ToggleCountry from './components/ToggleCountry';
import GeoLocation from './components/GeoLocation';

import { initialLocation, initialCoordinates, initialSearchCity } from './data';

function App() {
  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem('location')!) || initialLocation
  );
  const [searchCity, setSearchCity] = useState(
    localStorage.getItem('searchCity') || initialSearchCity
  );
  const [isGlobal, setIsGlobal] = useState<boolean>(
    JSON.parse(localStorage.getItem('isGlobal')!) || false
  );
  const [today, setToday] = useState('');
  const [tomorrow, setTomorrow] = useState('');
  const [weatherData, setWeatherData] = useState({} as WeatherData);
  const [forecasts, setForecasts] = useState([] as Forecasts);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [useLocation, setUseLocation] = useState(false);

  // Get Today's Date
  useEffect(() => {
    setToday(format(new Date(), 'yyyy-MM-dd'));
    setTomorrow(format(add(new Date(), { days: 1 }), 'yyyy-MM-dd'));
  }, []);

  // Fetch Current Weather
  useEffect(() => {
    let countryCode: string;
    let url: string;

    // Determine which URL to use
    if (useLocation) {
      url = `https://api.weatherbit.io/v2.0/current?&lat=${coordinates.lat}&lon=${coordinates.long}&key=${process.env.REACT_APP_WEATHER_KEY}`;
    } else {
      isGlobal ? (countryCode = '') : (countryCode = 'US');
      url = `https://api.weatherbit.io/v2.0/current?&city=${searchCity}&country=${countryCode}&key=${process.env.REACT_APP_WEATHER_KEY}`;
    }

    fetch(url)
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
        setSearchCity(res.data[0].city_name.toLowerCase());
      })
      .catch((err) => {
        alert(`Unable to find location "${searchCity}"`);
      });
  }, [searchCity, isGlobal, coordinates, useLocation]);

  // Fetch 5-Day Forecast
  useEffect(() => {
    let countryCode: string;
    let url: string;

    // Determine which URL to use
    if (useLocation) {
      url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${coordinates.lat}&lon=${coordinates.long}&key=${process.env.REACT_APP_WEATHER_KEY}`;
    } else {
      isGlobal ? (countryCode = '') : (countryCode = 'US');
      url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchCity}&country=${countryCode}&key=${process.env.REACT_APP_WEATHER_KEY}`;
    }

    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setForecasts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [searchCity, isGlobal, coordinates, useLocation]);

  // Check Loading State
  useEffect(() => {
    if (Object.keys(weatherData).length === 0 || forecasts.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [forecasts, weatherData]);

  // Set LocalStorage
  useEffect(() => {
    localStorage.setItem('location', JSON.stringify(location));
    localStorage.setItem('searchCity', location.city);
  }, [location, searchCity]);

  if (loading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <div>
        <GeoLocation
          setCoordinates={setCoordinates}
          setUseLocation={setUseLocation}
        />
        <Location location={location} isGlobal={isGlobal} />
        <ToggleCountry
          isGlobal={isGlobal}
          setIsGlobal={setIsGlobal}
          setSearchCity={setSearchCity}
        />
        <CurrentWeather
          weatherData={weatherData}
          forecasts={forecasts}
          today={today}
          tomorrow={tomorrow}
          setWeatherData={setWeatherData}
        />
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setSearchCity={setSearchCity}
          isGlobal={isGlobal}
          setUseLocation={setUseLocation}
        />
        <WeeklyForecast forecasts={forecasts} />
      </div>
    );
  }
}

export default App;
