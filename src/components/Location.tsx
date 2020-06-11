import React from 'react';
import CSS from 'csstype';

interface Props {
  location: ILocation;
}

const Location: React.FC<Props> = ({ location }) => {
  return (
    <div>
      <h1 style={styles}>{`${location.city}, ${location.state}`}</h1>
    </div>
  );
};

const styles: CSS.Properties = {
  textTransform: 'capitalize',
};

export default Location;
