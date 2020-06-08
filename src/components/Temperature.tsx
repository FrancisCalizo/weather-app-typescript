import React, { useEffect, useState } from 'react';

interface Props {
  weatherData: IWeatherData;
}

const Temperature: React.FC<Props> = ({ weatherData }) => {
  const [temperature, setTemperature] = useState<number>(0);

  useEffect(() => {
    if (weatherData) {
      let tempInFarenheight = Math.round(weatherData!.temp * (9 / 5) + 32);

      if (tempInFarenheight) {
        setTemperature(tempInFarenheight);
      }
    }
  }, [weatherData]);

  if (!weatherData) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <p>Temperature:{temperature}</p>
      </div>
    );
  }
};

export default Temperature;
