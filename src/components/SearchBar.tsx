import React, { ChangeEvent, FormEvent } from 'react';

interface Props {
  searchInput: string;
  setSearchInput: (input: string) => void;
  setCity: (input: string) => void;
}

const SearchBar: React.FC<Props> = ({
  searchInput,
  setSearchInput,
  setCity,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setCity(searchInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a location"
        value={searchInput}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
