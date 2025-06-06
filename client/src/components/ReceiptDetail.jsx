import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReceiptById } from '../services/api';
import './ReceiptDetail.css';

const ReceiptDetail = () => {
  const { id } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        setIsLoading(true);
        const response = await getReceiptById(id);
        setReceipt(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching receipt:', err);
        setError('Failed to load receipt details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceipt();
  }, [id]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);

  if (isLoading) {
    return (
      <div className="center-spinner">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return <div className="card error-card">{error}</div>;
  }

  if (!receipt) {
    return <div className="card">Receipt not found</div>;
  }

  const { merchant_name, purchased_at, total_amount, items } = receipt.receipt;
  const { file_name, created_at, file_path } = receipt.file_details;

  return (
    <div className="card">
      <div className="card-header">
        <h2>Receipt Details</h2>
        <button className="btn outline" onClick={() => window.history.back()}>
          ← Back to List
        </button>
      </div>

      <div className="details-section">
        <div>
          <h3>{merchant_name}</h3>
          <p className="meta">Date: {new Date(purchased_at).toLocaleString()}</p>
        </div>
        <div className="total-box">
          <h4>Total Amount</h4>
          <p className="total">{formatCurrency(total_amount)}</p>
        </div>
      </div>

      <h4>Items</h4>
      <table className="receipt-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th className="right">Price</th>
            <th className="right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items?.length > 0 ? (
            items.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td className="right">{formatCurrency(item.price)}</td>
                <td className="right bold">{formatCurrency(item.quantity * item.price)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="center muted">No items found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="file-section">
        <h4>Original File</h4>
        <p>
          <strong>File name:</strong> {file_name}<br />
          <strong>Uploaded at:</strong> {new Date(created_at).toLocaleString()}
        </p>
        <a
          className="btn outline secondary"
          href={`http://localhost:5001${file_path}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Original PDF
        </a>
      </div>
    </div>
  );
};

export default ReceiptDetail;
