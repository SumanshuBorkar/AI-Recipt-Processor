import React from 'react';
import { validateFile, processFile } from '../services/api';
import './FileList.css';

const FileList = ({ files, refreshFiles }) => {
  const handleValidate = async (fileId) => {
    try {
      await validateFile(fileId);
      refreshFiles();
    } catch (error) {
      console.error('Validation error:', error);
      alert('Validation failed: ' + error.message);
    }
  };

  const handleProcess = async (fileId) => {
    try {
      await processFile(fileId);
      refreshFiles();
    } catch (error) {
      console.error('Processing error:', error);
      alert('Processing failed: ' + error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="filelist-card">
      <h2 className="filelist-title">Uploaded Files</h2>

      {files.length === 0 ? (
        <p className="filelist-empty">No files uploaded yet</p>
      ) : (
        <div className="filelist-table-wrapper">
          <table className="filelist-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Status</th>
                <th>Uploaded At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td>{file.file_name}</td>
                  <td>
                    <span className={`badge ${file.is_valid ? 'badge-success' : 'badge-danger'}`}>
                      {file.is_valid ? 'Valid' : 'Invalid'}
                    </span>
                    {file.is_processed && <span className="badge badge-info">Processed</span>}
                  </td>
                  <td>{formatDate(file.created_at)}</td>
                  <td>
                    {!file.is_valid && (
                      <button
                        onClick={() => handleValidate(file.id)}
                        className="btn btn-warning"
                      >
                        Validate
                      </button>
                    )}
                    {file.is_valid && !file.is_processed && (
                      <button
                        onClick={() => handleProcess(file.id)}
                        className="btn btn-primary"
                      >
                        Process
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileList;
