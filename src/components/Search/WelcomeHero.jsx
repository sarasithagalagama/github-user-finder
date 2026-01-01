import React from "react";

const WelcomeHero = () => {
  return (
    <div className="welcome-state" id="welcome-container">
      <div className="welcome-content">
        <div className="welcome-icon">
          <i className="fab fa-github"></i>
        </div>
        <h2>Explore GitHub Profiles</h2>
        <p>
          Enter a username to discover repositories, contributions, and detailed
          stats.
        </p>
        <div className="feature-pills">
          <span className="pill">
            <i className="fas fa-user-circle"></i> Profile Data
          </span>
          <span className="pill">
            <i className="fas fa-code-branch"></i> Latest Repos
          </span>
          <span className="pill">
            <i className="fas fa-users"></i> Social Stats
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;
