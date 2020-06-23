import React, { MouseEvent } from 'react';

import location from '../images/location.png';

interface Props {
  setCoordinates: (coordinates: ICoordinates) => void;
  setUseLocation: (bool: boolean) => void;
  setInProp: (input: boolean) => void;
}

const GeoLocation: React.FC<Props> = ({
  setCoordinates,
  setUseLocation,
  setInProp,
}) => {
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
      setInProp(false);
      navigator.geolocation.getCurrentPosition(getPos, posError);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="w-1/4 ml-3">
      <button
        onClick={handleClick}
        className="border-2 border-gray-700 rounded-full shadow-2xl"
      >
        <img src={location} alt="location" className="w-8 inline" />
      </button>
    </div>
  );
};

export default GeoLocation;
