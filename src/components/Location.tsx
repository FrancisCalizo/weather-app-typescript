import React from 'react';
import CSS from 'csstype';

interface Props {
  location: ILocation;
  isGlobal: boolean;
}

const Location: React.FC<Props> = ({ location, isGlobal }) => {
  return (
    <div>
      <h1 className="text-3xl text-center" style={styles}>{`${location.city}, ${
        isGlobal ? location.country : location.state
      }`}</h1>
    </div>
  );
};

const styles: CSS.Properties = {
  textTransform: 'capitalize',
};

export default Location;
