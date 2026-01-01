import React from "react";

const StatsCard = ({ user }) => {
  return (
    <div className="card stats-card">
      <div className="stat-item">
        <div className="stat-icon">
          <i className="fas fa-users"></i>
        </div>
        <div className="stat-value">{user.followers}</div>
        <div className="stat-label">Followers</div>
      </div>
      <div className="stat-item">
        <div className="stat-icon">
          <i className="fas fa-user-friends"></i>
        </div>
        <div className="stat-value">{user.following}</div>
        <div className="stat-label">Following</div>
      </div>
      <div className="stat-item">
        <div className="stat-icon">
          <i className="fas fa-code"></i>
        </div>
        <div className="stat-value">{user.public_repos}</div>
        <div className="stat-label">Repos</div>
      </div>
    </div>
  );
};

export default StatsCard;
