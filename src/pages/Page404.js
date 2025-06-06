import React from "react";
import { Link } from "react-router-dom";
import "../Page404.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      {/* 404 Heading */}
      <h1 className="notfound-header">404</h1>

      {/* Subheading */}
      <h2 className="notfound-subheader"> Page Not Found</h2>

      {/* Message */}
      <p className="notfound-text">
        At The Opulence, every detail is curated to perfection. <br></br>
        Unfortunately, the page you are looking for is a rare gem.
      </p>

      {/* Link back to Homepage */}
      <Link to="/" className="notfound-button">
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
