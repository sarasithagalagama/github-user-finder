import React, { useState } from "react";
import { CuratedCollections } from "./CollectionCard";
import TopicExplorer from "./TopicExplorer";
import TrendingFeed from "./TrendingFeed";

const ClassroomView = () => {
  const [selectedTopic, setSelectedTopic] = useState("education");

  return (
    <div id="view-classroom">
      <div className="classroom-header">
        <h2>
          <i className="fas fa-book-reader"></i> Community Classroom
        </h2>
        <p>
          Hand-picked open source learning paths & trending educational
          resources.
        </p>
      </div>

      <CuratedCollections />

      <TopicExplorer
        currentTopic={selectedTopic}
        onSelectTopic={setSelectedTopic}
      />

      <TrendingFeed topic={selectedTopic} />
    </div>
  );
};

export default ClassroomView;
