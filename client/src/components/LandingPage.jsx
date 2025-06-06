import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="landing-container">
      <div className="hero">
        <h1 className="hero-title">Smart Receipt Scanner</h1>
        <p className="hero-subtitle">
          Upload PDF receipts, validate them, extract itemized data with OCR, and manage all your receipts in one place.
        </p>
        <p className="hero-highlight">Powered by intelligent parsing and clean UX.</p>
        <button className="hero-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
      <div className="animated-wave"></div>
    </div>
  );
};

export default LandingPage;
