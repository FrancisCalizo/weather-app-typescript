import React, { useEffect, useState } from 'react';
import { format, add } from 'date-fns';

import Navbar from './components/Navbar';
import CurrentWeather from './components/CurrentWeather';
import Location from './components/Location';
import WeeklyForecast from './components/WeeklyForecast';

import { initialLocation, initialCoordinates, initialSearchCity } from './data';
import HourlyForecast from './components/HourlyForecast';

function App() {
  const [location, setLocation] = useState<ILocation>(
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
  const [hourlyForecasts, setHourlyForecasts] = useState(
    [] as IHourlyForecast[]
  );
  const [hours] = useState(6);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [useLocation, setUseLocation] = useState(false);
  const [background, setBackground] = useState({
    backgroundColor: '#fff',
    backgroundImage: 'none',
  });

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

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setForecasts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [searchCity, isGlobal, coordinates, useLocation]);

  // Fetch Hourly Forecast
  useEffect(() => {
    let countryCode: string;
    let url: string;

    // Determine which URL to use
    if (useLocation) {
      url = `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${coordinates.lat}&lon=${coordinates.long}&key=${process.env.REACT_APP_WEATHER_KEY}&hours=${hours}`;
    } else {
      isGlobal ? (countryCode = '') : (countryCode = 'US');
      url = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${searchCity}&country=${countryCode}&key=${process.env.REACT_APP_WEATHER_KEY}&hours=${hours}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setHourlyForecasts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [searchCity, isGlobal, coordinates, useLocation, hours]);

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

    if (useLocation) {
      localStorage.setItem('searchCity', `${location.city}, ${location.state}`);
    } else {
      localStorage.setItem('searchCity', searchCity);
    }
  }, [location, searchCity, useLocation]);

  // Get Background Color
  useEffect(() => {
    let code = Number(weatherData?.weather?.code);
    console.log(code);
    switch (true) {
      case code < 300:
        setBackground({ backgroundColor: '#fff', backgroundImage: 'none' });
        break;
      case code === 800 || code === 801:
        setBackground({
          backgroundColor: '#f0e756',
          backgroundImage: 'linear-gradient(225deg, #f0e756 0%, #ff8300 69%)',
        });
        break;
      case code === 802 || code === 803 || code === 804:
        setBackground({
          backgroundColor: '#565555',
          backgroundImage: 'linear-gradient(45deg, #565555 14%, #9e9e9e 55%)',
        });
        break;
    }
  }, [weatherData, searchCity]);

  if (loading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <div className="max-w-lg mx-auto mx-4 text-white" style={background}>
        <Navbar
          setCoordinates={setCoordinates}
          setUseLocation={setUseLocation}
          isGlobal={isGlobal}
          setIsGlobal={setIsGlobal}
          setSearchCity={setSearchCity}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <div>
          <Location location={location} isGlobal={isGlobal} />
          <CurrentWeather
            weatherData={weatherData}
            forecasts={forecasts}
            today={today}
            tomorrow={tomorrow}
            setWeatherData={setWeatherData}
          />
        </div>
        <HourlyForecast hourlyForecasts={hourlyForecasts} />
        <WeeklyForecast forecasts={forecasts} />
      </div>
    );
  }
}

export default App;
