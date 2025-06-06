import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Dashboard from './components/Dashboard';
import ReceiptDetail from './components/ReceiptDetail';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Container fluid className="main-content">
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/receipts/:id" element={<ReceiptDetail />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;