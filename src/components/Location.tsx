import React from 'react';

interface Props {
  location: ILocation;
  isGlobal: boolean;
}

const Location: React.FC<Props> = ({ location, isGlobal }) => {
  return (
    <div>
      <h1 className="text-2xl xs:text-3xl font-bold text-center capitalize mt-8">{`${
        location.city
      }, ${isGlobal ? location.country : location.state}`}</h1>
    </div>
  );
};

export default Location;
