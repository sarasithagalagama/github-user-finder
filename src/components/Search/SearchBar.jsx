import React, { useState, useEffect, useRef } from "react";
import { useGithub } from "../../context/GithubContext";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { searchUser, suggestions, fetchSuggestions, clearSearch } =
    useGithub();
  const searchTimeout = useRef(null);

  const handleSearch = () => {
    if (query.trim()) {
      searchUser(query);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);

    // Debounce suggestions
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (val.trim()) {
      searchTimeout.current = setTimeout(() => {
        fetchSuggestions(val);
        setShowSuggestions(true);
      }, 300);
    } else {
      setShowSuggestions(false);
      clearSearch(); // Reset to Hero if cleared
    }
  };

  const handleSelectSuggestion = (login) => {
    setQuery(login);
    setShowSuggestions(false);
    searchUser(login);
  };

  return (
    <div className="search-wrapper">
      <div className="search-box">
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          id="search"
          placeholder="Search username..."
          autoComplete="off"
          spellCheck="false"
          value={query}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowSuggestions(true)}
          // Delay blur to allow clicking suggestions
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <button id="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((user) => (
            <li
              key={user.id}
              onClick={() => handleSelectSuggestion(user.login)}
            >
              {user.login}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
