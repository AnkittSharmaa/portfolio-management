// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MyAssets from './components/MyAssets';
import FundManagement from './components/FundManagement';
import Trades from './components/Trades';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fund-management" element={<FundManagement />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/my-assets" element={<MyAssets />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
