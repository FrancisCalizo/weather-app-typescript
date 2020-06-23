import React from 'react';

import GeoLocation from './GeoLocation';
import ToggleCountry from './ToggleCountry';
import SearchBar from './SearchBar';

interface Props {
  setCoordinates: (coordinates: ICoordinates) => void;
  setUseLocation: (bool: boolean) => void;
  isGlobal: boolean;
  setIsGlobal: (isGlobal: boolean) => void;
  setSearchCity: (input: string) => void;
  searchInput: string;
  setSearchInput: (input: string) => void;
  setInProp: (input: boolean) => void;
}

const Navbar: React.FC<Props> = ({
  setCoordinates,
  setUseLocation,
  isGlobal,
  setIsGlobal,
  setSearchCity,
  searchInput,
  setSearchInput,
  setInProp,
}) => {
  return (
    <nav className="flex flex-row justify-between items-center pt-3">
      <GeoLocation
        setCoordinates={setCoordinates}
        setUseLocation={setUseLocation}
        setInProp={setInProp}
      />
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchCity={setSearchCity}
        isGlobal={isGlobal}
        setUseLocation={setUseLocation}
        setInProp={setInProp}
      />
      <ToggleCountry
        isGlobal={isGlobal}
        setIsGlobal={setIsGlobal}
        setSearchCity={setSearchCity}
      />
    </nav>
  );
};

export default Navbar;
