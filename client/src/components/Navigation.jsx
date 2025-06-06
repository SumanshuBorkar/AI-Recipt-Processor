import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          🧾 Receipt Processor
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Dashboard</Link>
          <a
            href="https://github.com/SumanshuBorkar/AI-Recipt-Processor.git"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            <i className="bi bi-github" style={{ marginRight: '5px' }}></i>
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
