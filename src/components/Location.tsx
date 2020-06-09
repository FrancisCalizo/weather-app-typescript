import React from 'react';

interface Props {
  location: string;
}

const Location: React.FC<Props> = ({ location }) => {
  return (
    <div>
      <h1>{location}</h1>
    </div>
  );
};

export default Location;
