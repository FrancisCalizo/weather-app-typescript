import React, { MouseEvent } from 'react';

import location from '../images/location.png';

interface Props {
  setCoordinates: (coordinates: ICoordinates) => void;
  setUseLocation: (bool: boolean) => void;
}

const GeoLocation: React.FC<Props> = ({ setCoordinates, setUseLocation }) => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();

    const getPos: PositionCallback = (pos): void => {
      setUseLocation(true);
      setCoordinates({ lat: pos.coords.latitude, long: pos.coords.longitude });
    };

    const posError: PositionErrorCallback = (err) => {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          console.error('User denied the request for Geolocation.');
          break;
        case err.POSITION_UNAVAILABLE:
          console.error('Location information is unavailable.');
          break;
        case err.TIMEOUT:
          console.error('The request to get user location timed out.');
          break;
        default:
          console.error('An unknown error occurred.');
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPos, posError);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <button onClick={handleClick}>
        <img src={location} alt="location" className="w-8 inline" />
        Current
      </button>
    </div>
  );
};

export default GeoLocation;
