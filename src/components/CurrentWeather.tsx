import React, { useEffect, useState } from 'react';

interface Props {
  weatherData: IWeatherData;
  forecasts: IForecasts;
}

const CurrentWeather: React.FC<Props> = ({ weatherData, forecasts }) => {
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    if (weatherData) {
      let tempInFarenheight = Math.round(weatherData.temp * (9 / 5) + 32);
      setTemperature(tempInFarenheight);

      // let todaysDate = weatherData.ob_time.substr(
      //   0,
      //   weatherData.ob_time.indexOf(' ')
      // );
    }
  }, [weatherData]);

  if (!weatherData) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <span>{temperature}&#176;</span>
        <span>{weatherData.weather.description}</span>
        <span>High:</span>
        <span>Low:</span>
        {weatherData.datetime}
      </div>
    );
  }
};

export default CurrentWeather;
