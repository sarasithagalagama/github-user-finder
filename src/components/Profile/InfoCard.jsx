import React from "react";

const InfoCard = ({ user }) => {
  const getBlogUrl = (url) => {
    if (!url) return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="card info-card">
      <h3>Details</h3>
      <div className="info-list">
        <div className="info-row">
          <i className="fas fa-map-marker-alt"></i>
          <span>{user.location || "Not specified"}</span>
        </div>
        <div className="info-row">
          <i className="fas fa-building"></i>
          <span>{user.company || "Not specified"}</span>
        </div>
        <div className="info-row">
          <i className="fas fa-link"></i>
          {user.blog ? (
            <a
              href={getBlogUrl(user.blog)}
              target="_blank"
              className="truncate"
              rel="noreferrer"
            >
              {user.blog}
            </a>
          ) : (
            <span>No website</span>
          )}
        </div>
        <div className="info-row">
          <i className="fab fa-twitter"></i>
          {user.twitter_username ? (
            <a
              href={`https://twitter.com/${user.twitter_username}`}
              target="_blank"
              rel="noreferrer"
            >
              @{user.twitter_username}
            </a>
          ) : (
            <span>No Twitter</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
