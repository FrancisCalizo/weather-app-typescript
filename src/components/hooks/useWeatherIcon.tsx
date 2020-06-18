import { useState, useEffect } from 'react';

import clear from '../../images/clear.png';
import cloudy from '../../images/cloudy.png';
import drizzle from '../../images/drizzle.png';
import fog from '../../images/fog.png';
import overcast from '../../images/overcast.png';
import partlyCloudy from '../../images/partly-cloudy.png';
import rain from '../../images/rain.png';
import sleet from '../../images/sleet.png';
import snow from '../../images/snow.png';
import thunderstorm from '../../images/thunderstorm.png';

const useWeatherIcon = (code: number): string => {
  const [icon, setIcon] = useState('');

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
        setIcon(clear);
        break;
      case code === 801 || code === 802:
        setIcon(partlyCloudy);
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
  }, [code]);

  return icon;
};

export default useWeatherIcon;
