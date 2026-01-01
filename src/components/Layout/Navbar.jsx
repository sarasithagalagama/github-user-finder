import React from "react";

const Navbar = ({ activeView, setActiveView }) => {
  return (
    <nav className="app-nav">
      <button
        className={`nav-btn ${activeView === "search" ? "active" : ""}`}
        onClick={() => setActiveView("search")}
        data-view="search"
      >
        <i className="fas fa-search"></i> Search
      </button>
      <button
        className={`nav-btn ${activeView === "classroom" ? "active" : ""}`}
        onClick={() => setActiveView("classroom")}
        data-view="classroom"
      >
        <i className="fas fa-graduation-cap"></i> Classroom
      </button>
    </nav>
  );
};

export default Navbar;
