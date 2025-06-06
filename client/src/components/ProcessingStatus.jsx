import React from 'react';
import './ProcessingStatus.css';

const ProcessingStatus = ({ status, progress }) => {
  if (status === 'validating') {
    return (
      <div className="status-container text-primary">
        <div className="spinner" />
        <span>Validating PDF structure...</span>
      </div>
    );
  }

  if (status === 'processing') {
    return (
      <div className="status-block">
        <div className="status-container text-info">
          <div className="spinner" />
          <span>Processing receipt with OCR...</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          >{`${progress}%`}</div>
        </div>
      </div>
    );
  }

  if (status === 'extracting') {
    return (
      <div className="status-container text-warning">
        <div className="spinner" />
        <span>Extracting receipt data...</span>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="status-container text-success">
        <span className="icon success">&#10004;</span>
        <span>Processing completed successfully!</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="status-container text-danger">
        <span className="icon error">&#9888;</span>
        <span>Processing failed. Please try again.</span>
      </div>
    );
  }

  return null;
};

export default ProcessingStatus;
