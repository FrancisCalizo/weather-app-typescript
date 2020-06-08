import React from 'react';

interface Props {
  city: string;
}

const Location: React.FC<Props> = ({ city }) => {
  return (
    <div>
      <h1>{city}</h1>
    </div>
  );
};

export default Location;
