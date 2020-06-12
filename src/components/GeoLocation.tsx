import React, { MouseEvent } from 'react';

const GeoLocation = () => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();

    const getPos: PositionCallback = (pos): void => {
      console.log(pos.coords.latitude);
      console.log(pos.coords.longitude);
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
      <button onClick={handleClick}>Get Location</button>
    </div>
  );
};

export default GeoLocation;
