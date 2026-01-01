import React from "react";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="social-links">
          <a
            href="https://github.com/sarasithagalagama"
            target="_blank"
            title="GitHub"
            rel="noreferrer"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/sarasitha-galagama/"
            target="_blank"
            title="LinkedIn"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://www.instagram.com/sarasitha_galagama/"
            target="_blank"
            title="Instagram"
            rel="noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className="footer-text">
          <p>
            Designed & Developed by{" "}
            <a
              href="https://sarasitha.me/"
              target="_blank"
              className="developer-name"
              rel="noreferrer"
            >
              Sarasitha Galagama
            </a>
          </p>
          <p className="copyright">&copy; 2026 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
