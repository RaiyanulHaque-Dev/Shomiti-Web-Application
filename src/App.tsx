import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DevConsole from './pages/DevConsole';
import FinancialManagement from './pages/FinancialManagement';
import TransactionLedger from './pages/TransactionLedger';
import MemberList from './pages/MemberList';
import AdminMemberList from './pages/AdminMemberList';
import Settings from './pages/Settings';
import NoticeManagement from './pages/NoticeManagement';
import Notices from './pages/Notices';
import Contact from './pages/Contact';
import SupportManagement from './pages/SupportManagement';
import ContentManagement from './pages/ContentManagement';
import SystemOverrides from './pages/SystemOverrides';
import Apply from './pages/Apply';
import Transparency from './pages/Transparency';
import FAQ from './pages/FAQ';
import Downloads from './pages/Downloads';
import Rules from './pages/Rules';

import ProtectedRoute from './components/ProtectedRoute';
import { GodModeProvider } from './context/GodModeContext';

function App() {
  return (
    <GodModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dev-console" 
          element={
            <ProtectedRoute role="developer">
              <DevConsole />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/savings" 
          element={
            <ProtectedRoute>
              <FinancialManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ledger" 
          element={
            <ProtectedRoute>
              <TransactionLedger />
            </ProtectedRoute>
          } 
        />
        <Route path="/members" element={<MemberList />} />
        <Route 
          path="/admin/members" 
          element={
            <ProtectedRoute>
              <AdminMemberList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />
        <Route path="/notices" element={<Notices />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/admin/notices" 
          element={
            <ProtectedRoute>
              <NoticeManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/support" 
          element={
            <ProtectedRoute>
              <SupportManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/content" 
          element={
            <ProtectedRoute>
              <ContentManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/overrides" 
          element={
            <ProtectedRoute>
              <SystemOverrides />
            </ProtectedRoute>
          } 
        />
        <Route path="/apply" element={<Apply />} />
        <Route path="/transparency" element={<Transparency />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </Router>
  </GodModeProvider>
);
}

export default App;
