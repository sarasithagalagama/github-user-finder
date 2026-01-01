import React from "react";

const TopicExplorer = ({ currentTopic, onSelectTopic }) => {
  const topics = [
    { id: "education", label: "All" },
    { id: "machine-learning", label: "Machine Learning" },
    { id: "web-development", label: "Web Dev" },
    { id: "devops", label: "DevOps" },
    { id: "system-design", label: "System Design" },
    { id: "javascript", label: "JavaScript" },
    { id: "python", label: "Python" },
  ];

  return (
    <section className="topic-section">
      <h3>Explore by Topic</h3>
      <div className="topic-chips">
        {topics.map((topic) => (
          <button
            key={topic.id}
            className={`topic-btn ${currentTopic === topic.id ? "active" : ""}`}
            onClick={() => onSelectTopic(topic.id)}
            data-topic={topic.id}
          >
            {topic.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TopicExplorer;
