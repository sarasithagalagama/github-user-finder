import React, { useState } from "react";
import Layout from "./components/Layout/Layout";
import WelcomeHero from "./components/Search/WelcomeHero";
import SearchBar from "./components/Search/SearchBar";
import ProfileView from "./components/Profile/ProfileView";
import ClassroomView from "./components/Classroom/ClassroomView";
import { useGithub } from "./context/GithubContext";

function App() {
  const [activeView, setActiveView] = useState("search");
  const { userData, isSearchActive } = useGithub();

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {activeView === "search" && (
        <>
          <SearchBar />
          {/* Show Welcome Hero if no user is searched/found yet */}
          {!userData && !isSearchActive && <WelcomeHero />}

          {/* Show Profile if data exists or loading/error */}
          {(userData || isSearchActive) && <ProfileView />}
        </>
      )}

      {activeView === "classroom" && <ClassroomView />}
    </Layout>
  );
}

export default App;
