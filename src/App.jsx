import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MQL from './pages/MQL';
import TrioLeads from './pages/TrioLeads';
import LeadIntelligence from './pages/LeadIntelligence';
import DecemberOverview from './pages/DecemberOverview';
import January7_11Leads from './pages/January7_11Leads';
import EmbeddedLeads from './pages/EmbeddedLeads';
import Auroralabswebsite from './pages/Auroralabswebsite';
import Auroralabs2 from './pages/Auroralabs2';
import LociPlaybook from './pages/LociPlaybook';

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
        <Route path="/embedded-leads" element={<EmbeddedLeads />} />
        <Route path="/aurora-labs" element={<Auroralabswebsite />} />
        <Route path="/aurora-labs-2" element={<Auroralabs2 />} />
        <Route path="/loci-playbook" element={<LociPlaybook />} />
      </Routes>
    </Router>
  );
}
