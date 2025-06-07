import axios from 'axios';

const API_BASE_URL = 'https://ai-recipt-processor-server.onrender.com/api';

// File operations
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const validateFile = (fileId) => {
  return axios.post(`${API_BASE_URL}/validate`, { fileId });
};

export const processFile = (fileId) => {
  return axios.post(`${API_BASE_URL}/process`, { fileId });
};

export const getFiles = () => {
    return axios.get(`${API_BASE_URL}/files`);
  };

// Receipt operations
export const getReceipts = () => {
    return axios.get(`${API_BASE_URL}/receipts`);
  };

export const getReceiptById = (id) => {
  return axios.get(`${API_BASE_URL}/receipts/${id}`);
};
