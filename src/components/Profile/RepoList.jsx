import React from "react";
import RepoCard from "../Shared/RepoCard";

const RepoList = ({ repos }) => {
  return (
    <div className="card repos-card-wrapper">
      <div className="repos-header">
        <h3>Latest Repositories</h3>
        <div className="repos-badge">Top 6</div>
      </div>
      <div className="repos-grid">
        {repos && repos.length > 0 ? (
          repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
        ) : (
          <div className="no-repos">No repositories found</div>
        )}
      </div>
    </div>
  );
};

export default RepoList;
