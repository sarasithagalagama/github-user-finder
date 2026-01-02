import React from "react";

const ErrorState = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="card error-state"
      style={{ maxWidth: "500px", margin: "2rem auto" }}
    >
      <div
        className="error-icon"
        style={{
          background:
            "linear-gradient(135deg, var(--primary), var(--secondary))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
        <i className="fas fa-search-minus"></i>
      </div>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>User Not Found</h2>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
        {message ||
          "We couldn't locate that user. Please check the spelling or try a different username."}
      </p>
    </div>
  );
};

export default ErrorState;
