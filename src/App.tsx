import React, { useEffect, useState } from 'react';
import { format, add, getHours } from 'date-fns';

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
    const sunrise = 7;
    const sunset = 20;
    let code = Number(weatherData?.weather?.code);
    let hour = getHours(new Date(hourlyForecasts[0]?.timestamp_local));

    switch (true) {
      case code < 300:
        setBackground({
          backgroundColor: '#8383e6',
          backgroundImage: 'linear-gradient(0deg, #8383e6 20%, #273c75 82%)',
        });
        break;
      case code < 600 || code === 900:
        setBackground({
          backgroundColor: '#4834d4',
          backgroundImage: 'linear-gradient(0deg, #4834d4 20%, #273c75 82%)',
        });
        break;
      case code < 700:
        setBackground({
          backgroundColor: '#CCEBF8',
          backgroundImage: 'linear-gradient(0deg, #CCEBF8 32%, #BAE2FF 57%)',
        });
        break;
      case code < 800:
        setBackground({
          backgroundColor: '#878787',
          backgroundImage: 'linear-gradient(0deg, #878787 10%, #514D4D 57%)',
        });
        break;
      case code === 800 || code === 801 || code === 802:
        if (hour >= sunrise && hour < sunset) {
          setBackground({
            backgroundColor: '#148af0',
            backgroundImage:
              'linear-gradient(180deg, #148af0 11%, #b4d2e4 82%)',
          });
        } else {
          setBackground({
            backgroundColor: '#436498',
            backgroundImage: 'linear-gradient(0deg, #436498 10%, #23354c 71%)',
          });
        }
        break;
      case code === 803 || code === 804:
        setBackground({
          backgroundColor: '#878787',
          backgroundImage: 'linear-gradient(0deg, #878787 10%, #514D4D 57%)',
        });
        break;
      default:
        setBackground({
          backgroundColor: '#148af0',
          backgroundImage: 'linear-gradient(180deg, #148af0 11%, #b4d2e4 82%)',
        });
    }
  }, [weatherData, searchCity, hourlyForecasts]);

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
            hourlyForecasts={hourlyForecasts}
          />
        </div>
        <HourlyForecast hourlyForecasts={hourlyForecasts} />
        <WeeklyForecast forecasts={forecasts} />
      </div>
    );
  }
}

export default App;
