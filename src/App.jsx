import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TrioLeads from './pages/TrioLeads';

// Main App component that operates as a Router
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trio-leads" element={<TrioLeads />} />
      </Routes>
    </Router>
  );
}
