import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';
import ReceiptList from './ReceiptList';
import { getFiles, getReceipts } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const filesResponse = await getFiles();
        setFiles(filesResponse.data || []);

        const receiptsResponse = await getReceipts();
        let receiptsData = [];

        if (Array.isArray(receiptsResponse.data)) {
          receiptsData = receiptsResponse.data;
        } else if (
          receiptsResponse.data &&
          Array.isArray(receiptsResponse.data.receipts)
        ) {
          receiptsData = receiptsResponse.data.receipts;
        }

        setReceipts(receiptsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setFiles([]);
        setReceipts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshCounter]);

  const handleUploadSuccess = () => {
    setRefreshCounter((prev) => prev + 1);
  };

  const refreshFiles = () => {
    setRefreshCounter((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading application data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🧾 Receipt Processor</h1>
        <p>Upload, validate, and extract data from scanned receipts</p>
      </header>

      <div className="dashboard-grid">
        <div className="upload-section">
          <FileUpload onUpload={handleUploadSuccess} />
        </div>
        <div className="info-card">
          <h3>How it works</h3>
          <ol>
            <li>Upload a PDF receipt</li>
            <li>Validate the PDF structure</li>
            <li>Process with OCR to extract data</li>
            <li>View extracted receipt information</li>
          </ol>
          <p className="info-note">
            Supported features: PDF validation, OCR text extraction, data parsing, and storage.
          </p>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Uploaded Files</h2>
        <FileList files={files} refreshFiles={refreshFiles} />
      </div>

      <div className="section">
        <h2 className="section-title">Processed Receipts</h2>
        <ReceiptList receipts={receipts} />
      </div>
    </div>
  );
};

export default Dashboard;

