import React from "react";

const ErrorState = ({ message }) => {
  if (!message) return null;

  return (
    <div id="error-container" className="error-state">
      <div className="error-icon">
        <i className="fas fa-search-minus"></i>
      </div>
      <h2>User not found</h2>
      <p>
        {message ||
          "We couldn't locate that user. Please try a different username."}
      </p>
    </div>
  );
};

export default ErrorState;
