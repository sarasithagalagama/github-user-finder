import React from "react";

const InfoCard = ({ user }) => {
  const getBlogUrl = (url) => {
    if (!url) return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  const getHandleFromUrl = (url) => {
    if (!url) return "";
    const cleanUrl = url.endsWith("/") ? url.slice(0, -1) : url;
    return cleanUrl.split("/").pop();
  };

  return (
    <div className="card info-card">
      <h3>Details</h3>
      <div className="info-list">
        <div className="info-row">
          <i className="fas fa-map-marker-alt"></i>
          <span>{user.location || "Not specified"}</span>
        </div>

        {/* Email */}
        <div className="info-row">
          <i className="fas fa-envelope"></i>
          {user.email ? (
            <a href={`mailto:${user.email}`}>{user.email}</a>
          ) : (
            <span>No public email</span>
          )}
        </div>

        {/* Website */}
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

        {/* LinkedIn (from social_accounts) */}
        {user.social_accounts?.find((s) => s.provider === "linkedin") && (
          <div className="info-row">
            <i className="fab fa-linkedin"></i>
            <a
              href={
                user.social_accounts.find((s) => s.provider === "linkedin").url
              }
              target="_blank"
              rel="noreferrer"
            >
              in/
              {getHandleFromUrl(
                user.social_accounts.find((s) => s.provider === "linkedin").url
              )}
            </a>
          </div>
        )}

        {/* Twitter */}
        <div className="info-row">
          {/* Using Twitter icon for now, as X icon might not be available in this font version */}
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
            <span>No X/Twitter</span>
          )}
        </div>

        {/* Instagram (from social_accounts) */}
        {user.social_accounts?.find((s) => s.provider === "instagram") && (
          <div className="info-row">
            <i className="fab fa-instagram"></i>
            <a
              href={
                user.social_accounts.find((s) => s.provider === "instagram").url
              }
              target="_blank"
              rel="noreferrer"
            >
              {getHandleFromUrl(
                user.social_accounts.find((s) => s.provider === "instagram").url
              )}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
