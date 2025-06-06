import React, { useState } from 'react';
import { uploadFile } from '../services/api';
import './FileUpload.css';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a PDF file');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    try {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await uploadFile(file);
      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        onUpload(response.data.file);
        setIsUploading(false);
        setFile(null);
        setProgress(0);
      }, 500);
    } catch (err) {
      setError('Upload failed: ' + err.message);
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="upload-card">
      <h2 className="upload-title">Upload Receipt</h2>

      {error && <div className="upload-error">{error}</div>}

      <form onSubmit={handleSubmit} className="upload-form">
        <label htmlFor="fileInput" className="upload-label">
          Select PDF receipt
        </label>
        <input
          type="file"
          id="fileInput"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={isUploading}
          className="upload-input"
        />

        {isUploading && (
          <div className="upload-progress-container">
            <div className="upload-progress-bar" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
            <div className="upload-progress-text">Uploading...</div>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || isUploading}
          className="upload-button"
        >
          {isUploading ? 'Uploading...' : 'Upload Receipt'}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
