import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    title: "",
    author: "",
    genre: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(searchCriteria);
  };

  return (
    <div>
      <h3>Search Books</h3>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={searchCriteria.title}
        onChange={handleInputChange}
      />

      <label>Author:</label>
      <input
        type="text"
        name="author"
        value={searchCriteria.author}
        onChange={handleInputChange}
      />

      <label>Genre:</label>
      <input
        type="text"
        name="genre"
        value={searchCriteria.genre}
        onChange={handleInputChange}
      />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
