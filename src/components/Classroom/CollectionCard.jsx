import React from "react";

const CollectionCard = ({ title, desc, iconClass, iconType, links }) => {
  return (
    <div className="collection-card">
      <div className={`collection-icon ${iconType}`}>
        <i className={iconClass}></i>
      </div>
      <h4>{title}</h4>
      <p>{desc}</p>
      <div className="repo-links">
        {links.map((link, idx) => (
          <a key={idx} href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export const CuratedCollections = () => {
  return (
    <section className="curated-section">
      <h3>Curated Collections</h3>
      <div className="collection-grid">
        <CollectionCard
          title="Web Development"
          desc="Master modern web stacks with these roadmaps."
          iconClass="fas fa-laptop-code"
          iconType="web"
          links={[
            {
              label: "freeCodeCamp",
              url: "https://github.com/freeCodeCamp/freeCodeCamp",
            },
            {
              label: "Developer Roadmap",
              url: "https://github.com/kamranahmedse/developer-roadmap",
            },
            {
              label: "30 Seconds of Code",
              url: "https://github.com/30-seconds/30-seconds-of-code",
            },
          ]}
        />
        <CollectionCard
          title="Interview Prep"
          desc="Ace your next technical interview."
          iconClass="fas fa-user-tie"
          iconType="interview"
          links={[
            {
              label: "Coding Interview Univ",
              url: "https://github.com/jwasham/coding-interview-university",
            },
            {
              label: "Tech Interview Handbook",
              url: "https://github.com/yangshun/tech-interview-handbook",
            },
          ]}
        />
        <CollectionCard
          title="CS & Algorithms"
          desc="Deep dive into data structures and logic."
          iconClass="fas fa-brain"
          iconType="cs"
          links={[
            {
              label: "JS Algorithms",
              url: "https://github.com/trekhleb/javascript-algorithms",
            },
            {
              label: "Python Algorithms",
              url: "https://github.com/TheAlgorithms/Python",
            },
          ]}
        />
        <CollectionCard
          title="Beginner's Hub"
          desc="Start your open source journey here."
          iconClass="fas fa-seedling"
          iconType="beginner"
          links={[
            {
              label: "First Contributions",
              url: "https://github.com/firstcontributions/first-contributions",
            },
            {
              label: "Awesome for Beginners",
              url: "https://github.com/MunGell/awesome-for-beginners",
            },
          ]}
        />
      </div>
    </section>
  );
};

export default CollectionCard;
