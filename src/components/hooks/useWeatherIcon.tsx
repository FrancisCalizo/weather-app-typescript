import { useState, useEffect } from 'react';

import clear from '../../images/clear.png';
import clearNight from '../../images/clear-night.png';
import cloudy from '../../images/cloudy.png';
import drizzle from '../../images/drizzle.png';
import fog from '../../images/fog.png';
import overcast from '../../images/overcast.png';
import partlyCloudy from '../../images/partly-cloudy.png';
import partlyCloudyNight from '../../images/partly-cloudy-night.png';
import rain from '../../images/rain.png';
import sleet from '../../images/sleet.png';
import snow from '../../images/snow.png';
import thunderstorm from '../../images/thunderstorm.png';

const useWeatherIcon = (code: number, hour: number): string => {
  const [icon, setIcon] = useState('');
  const [sunrise] = useState(7);
  const [sunset] = useState(20);

  useEffect(() => {
    switch (true) {
      case code < 300:
        setIcon(thunderstorm);
        break;
      case code < 500:
        setIcon(drizzle);
        break;
      case code < 600:
        setIcon(rain);
        break;
      case code < 611:
        setIcon(snow);
        break;
      case code < 700:
        setIcon(sleet);
        break;
      case code < 800:
        setIcon(fog);
        break;
      case code === 800:
        if (hour >= sunrise && hour < sunset) {
          setIcon(clear);
        } else {
          setIcon(clearNight);
        }
        break;
      case code === 801 || code === 802:
        if (hour >= sunrise && hour < sunset) {
          setIcon(partlyCloudy);
        } else {
          setIcon(partlyCloudyNight);
        }
        break;
      case code === 803:
        setIcon(cloudy);
        break;
      case code === 804:
        setIcon(overcast);
        break;
      case code === 900:
        setIcon(rain);
        break;
      default:
        return;
    }
  }, [code, hour, sunrise, sunset]);

  return icon;
};

export default useWeatherIcon;
