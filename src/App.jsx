import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MQL from './pages/MQL';
import TrioLeads from './pages/TrioLeads';
import LeadIntelligence from './pages/LeadIntelligence';
import DecemberOverview from './pages/DecemberOverview';
import January7_11Leads from './pages/January7_11Leads';

// Main App component that operates as a Router
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mql" element={<MQL />} />
        <Route path="/trio-leads" element={<TrioLeads />} />
        <Route path="/lead-intelligence" element={<LeadIntelligence />} />
        <Route path="/december-overview" element={<DecemberOverview />} />
        <Route path="/january-7-11-leads" element={<January7_11Leads />} />
      </Routes>
    </Router>
  );
}
