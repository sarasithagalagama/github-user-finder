import React from "react";

const IdentityCard = ({ user }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="card identity-card">
      <div className="profile-image-wrapper">
        <img src={user.avatar_url} alt="Avatar" id="avatar" />
      </div>
      <div className="profile-meta">
        <h1>{user.name || user.login}</h1>
        <a
          href={user.html_url}
          target="_blank"
          className="username-handle"
          rel="noreferrer"
        >
          @{user.login} <i className="fas fa-external-link-alt"></i>
        </a>
        <p className="bio-text">{user.bio || "No bio available"}</p>
        <div className="joined-badge">
          <i className="far fa-calendar-alt"></i> Joined{" "}
          {formatDate(user.created_at)}
        </div>
      </div>
    </div>
  );
};

export default IdentityCard;
