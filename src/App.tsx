import React, { useEffect, useState } from 'react';
import Temperature from './components/Temperature';

function App() {
  const [weatherData, setWeatherData] = useState<IWeatherData>(null);

  useEffect(() => {
    fetch(
      `https://api.weatherbit.io/v2.0/current?&city=Miami&country=US&key=${process.env.REACT_APP_WEATHER_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data.data[0]);
      });
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      <Temperature weatherData={weatherData} />
    </div>
  );
}

export default App;
