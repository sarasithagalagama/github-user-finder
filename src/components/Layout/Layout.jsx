import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useGithub } from "../../context/GithubContext";

const Layout = ({ children, activeView, setActiveView }) => {
  const { isSearchActive } = useGithub();

  // If we are in 'classroom' view, we usually want top alignment,
  // OR if we are in 'search' view and search is active.
  const isTopAligned = activeView === "classroom" || isSearchActive;

  return (
    <>
      <div className="bg-glow"></div>
      <div className={`app-layout ${isTopAligned ? "search-active" : ""}`}>
        <header className="app-header">
          <div className="logo">
            <i className="fab fa-github"></i>
            <span>GitHype</span>
          </div>
          <p className="subtitle">
            Discover amazing developers and their work.
          </p>
        </header>

        <Navbar activeView={activeView} setActiveView={setActiveView} />

        {children}

        <Footer />
      </div>
    </>
  );
};

export default Layout;
