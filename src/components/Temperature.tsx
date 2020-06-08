import React from 'react';

interface Props {
  weatherData: IWeatherData;
}

const Temperature: React.FC<Props> = ({ weatherData }) => {
  if (!weatherData) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <p>Temperature:{weatherData!.temp}</p>
      </div>
    );
  }
};

export default Temperature;
