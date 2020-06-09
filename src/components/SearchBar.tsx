import React, { ChangeEvent } from 'react';

interface Props {
  searchInput: string;
  setSearchInput: (input: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchInput, setSearchInput }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <form>
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
