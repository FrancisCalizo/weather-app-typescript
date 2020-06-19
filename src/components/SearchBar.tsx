import React, { ChangeEvent, FormEvent } from 'react';

import search from '../images/search.png';

interface Props {
  searchInput: string;
  setSearchInput: (input: string) => void;
  setSearchCity: (input: string) => void;
  isGlobal: boolean;
  setUseLocation: (bool: boolean) => void;
}

const SearchBar: React.FC<Props> = ({
  searchInput,
  setSearchInput,
  setSearchCity,
  isGlobal,
  setUseLocation,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchInput) {
      setUseLocation(false);
      setSearchCity(searchInput);
      setSearchInput('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-row items-center">
        <input
          type="text"
          placeholder={isGlobal ? 'City, Country' : 'City, State'}
          value={searchInput}
          onChange={handleChange}
          className="block text-black"
        />
        <button type="submit" className="block">
          <img src={search} alt="search" className="w-8" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
