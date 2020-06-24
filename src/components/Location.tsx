import React, { useState, useEffect } from 'react';

interface Props {
  location: ILocation;
  isGlobal: boolean;
}

const Location: React.FC<Props> = ({ location, isGlobal }) => {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (isGlobal) {
      setDisplay(`${location.city}, ${location.country}`);
    } else {
      setDisplay(`${location.city}, ${location.state}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div>
      <h1 className="text-2xl xs:text-3xl font-bold text-center capitalize mt-8">
        {display}
      </h1>
    </div>
  );
};

export default Location;
