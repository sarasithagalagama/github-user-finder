import React from "react";

const RepoCard = ({ repo }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="repo-card">
      <a
        href={repo.html_url}
        target="_blank"
        className="repo-name"
        rel="noreferrer"
      >
        <i className="fas fa-book"></i> {repo.name}
      </a>
      <p className="repo-description">
        {repo.description || "No description available"}
      </p>
      <div className="repo-meta">
        {repo.language && (
          <div className="repo-meta-item">
            <i className="fas fa-circle"></i> {repo.language}
          </div>
        )}
        <div className="repo-meta-item">
          <i className="fas fa-star"></i> {repo.stargazers_count}
        </div>
        <div className="repo-meta-item">
          <i className="fas fa-code-fork"></i> {repo.forks_count}
        </div>
        <div className="repo-meta-item">
          <i className="fas fa-history"></i> {formatDate(repo.updated_at)}
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
