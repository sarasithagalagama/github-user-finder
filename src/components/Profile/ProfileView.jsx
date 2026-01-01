import React from "react";
import IdentityCard from "./IdentityCard";
import StatsCard from "./StatsCard";
import InfoCard from "./InfoCard";
import RepoList from "./RepoList";
import ErrorState from "../Shared/ErrorState";
import { useGithub } from "../../context/GithubContext";

const ProfileView = () => {
  const { userData, repos, error, loading } = useGithub();

  if (loading) {
    // Could use a spinner here, but text works for now
    return (
      <div className="loading-repos" style={{ color: "white" }}>
        Searching...
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!userData) return null;

  return (
    <main className="bento-grid">
      <IdentityCard user={userData} />
      <StatsCard user={userData} />
      <InfoCard user={userData} />
      <RepoList repos={repos} />
    </main>
  );
};

export default ProfileView;
