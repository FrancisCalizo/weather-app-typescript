import React, { ChangeEvent, FormEvent } from 'react';

interface Props {
  searchInput: string;
  setSearchInput: (input: string) => void;
  setSearchCity: (input: string) => void;
  isGlobal: boolean;
}

const SearchBar: React.FC<Props> = ({
  searchInput,
  setSearchInput,
  setSearchCity,
  isGlobal,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchInput) {
      setSearchCity(searchInput);
      setSearchInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={isGlobal ? 'City, Country' : 'City, State'}
        value={searchInput}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
