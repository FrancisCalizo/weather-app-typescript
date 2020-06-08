import React, { useEffect, useState } from 'react';
import Temperature from './components/Temperature';
import Location from './components/Location';

function App() {
  const [weatherData, setWeatherData] = useState<IWeatherData>(null);
  const [city, setCity] = useState<string>('Miami');

  useEffect(() => {
    fetch(
      `https://api.weatherbit.io/v2.0/current?&city=${city}&country=US&key=${process.env.REACT_APP_WEATHER_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setWeatherData(res.data[0]);
      });
  }, [city]);

  return (
    <div>
      <Location city={city} />
      <Temperature weatherData={weatherData} />
    </div>
  );
}

export default App;
