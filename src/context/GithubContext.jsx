import React, { createContext, useState, useContext } from "react";
import { githubApi } from "../services/githubApi";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  // State: Profile & Search
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false); // Controls Layout state

  // State: Suggestions
  const [suggestions, setSuggestions] = useState([]);

  // State: Classroom
  const [trendingRepos, setTrendingRepos] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState("education");

  // Actions
  const searchUser = async (query) => {
    setLoading(true);
    setError(null);
    setUserData(null);
    setRepos([]);
    // Only set active if we are actually searching,
    // but we might want to keep Welcome visible if it fails?
    // For now, let's assume search attempt = active layout
    setIsSearchActive(true);

    try {
      const user = await githubApi.searchUser(query);
      setUserData(user);

      // Fetch repos related to this user
      if (user.repos_url) {
        const userRepos = await githubApi.getUserRepos(user.repos_url);
        setRepos(userRepos);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setUserData(null);
    setRepos([]);
    setError(null);
    setIsSearchActive(false); // Go back to Welcome Hero
    setSuggestions([]);
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const results = await githubApi.getSuggestions(query);
      setSuggestions(results);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  };

  const fetchTrending = async (topic) => {
    setTrendingLoading(true);
    setCurrentTopic(topic);
    try {
      const repos = await githubApi.getTrendingRepos(topic);
      setTrendingRepos(repos);
    } catch (err) {
      console.error(err); // Trending shouldn't break the whole app
    } finally {
      setTrendingLoading(false);
    }
  };

  return (
    <GithubContext.Provider
      value={{
        userData,
        repos,
        loading,
        error,
        isSearchActive,
        suggestions,
        trendingRepos,
        trendingLoading,
        currentTopic,
        searchUser,
        clearSearch,
        fetchSuggestions,
        fetchTrending,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export const useGithub = () => useContext(GithubContext);
