import React, { useContext } from "react";
import { InputGroup, FormControl, Form } from "react-bootstrap";
import { MusicContext } from "../context/MusicContext";

const SearchBar = () => {
  const { handleSearch, searchTerm, activeTab } = useContext(MusicContext);
  let title = "For You";
  if (activeTab === "favorites") {
    title = "Favorites";
  } else if (activeTab === "recent") {
    title = "Recently Played";
  }

  return (
    <div className="search-container">
      <h2 className="section-title">{title}</h2>
      <Form.Control
        className="search-bar"
        type="text"
        placeholder="Search songs..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
