import React, { useEffect } from "react";
import RepoCard from "../Shared/RepoCard";
import { useGithub } from "../../context/GithubContext";

const TrendingFeed = ({ topic }) => {
  const { trendingRepos, trendingLoading, fetchTrending } = useGithub();

  // Load initial trending data if empty or topic changed
  useEffect(() => {
    fetchTrending(topic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  return (
    <section className="trending-section">
      <div className="repos-header">
        <h3 id="trending-title">
          Trending in {topic === "education" ? "Education" : topic}
        </h3>
        <div className="repos-badge">
          <i className="fas fa-fire"></i> Live
        </div>
      </div>
      <div className="repos-grid">
        {trendingLoading ? (
          <div className="loading-repos">Fetching trending resources...</div>
        ) : trendingRepos && trendingRepos.length > 0 ? (
          trendingRepos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
        ) : (
          <div className="no-repos">No trending repos found.</div>
        )}
      </div>
    </section>
  );
};

export default TrendingFeed;
