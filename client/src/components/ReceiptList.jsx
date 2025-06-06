import React from 'react';
import { Link } from 'react-router-dom';
import './ReceiptList.css';

const ReceiptList = ({ receipts }) => {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Processed Receipts</h2>

        {receipts.length === 0 ? (
          <p className="text-muted">No receipts processed yet</p>
        ) : (
          <table className="receipt-table">
            <thead>
              <tr>
                <th>Merchant</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((receipt) => (
                <tr key={receipt.id}>
                  <td>{receipt.merchant_name}</td>
                  <td>{formatDate(receipt.purchased_at)}</td>
                  <td className="bold">{formatCurrency(receipt.total_amount)}</td>
                  <td>
                    <span className="badge success">Processed</span>
                  </td>
                  <td>
                    <Link to={`/receipts/${receipt.id}`} className="btn info small">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReceiptList;
