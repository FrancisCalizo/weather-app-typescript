import React, { ChangeEvent, FormEvent } from 'react';

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
    <div className="w-1/2 flex justify-center">
      <div>
        <form onSubmit={handleSubmit} className="flex flex-row items-center">
          <input
            type="text"
            placeholder={isGlobal ? 'City, Country' : 'City, State'}
            value={searchInput}
            onChange={handleChange}
            className="block text-black rounded-full px-2 py-1 shadow-2xl border border-gray-600"
          />
          {/* <button type="submit" className="block">
            <img src={search} alt="search" className="w-8" />
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
