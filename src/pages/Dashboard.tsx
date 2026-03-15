import React from 'react';
import AdminDashboard from './AdminDashboard';
import DevDashboard from './DevDashboard';

export default function Dashboard() {
  const userRole = localStorage.getItem('userRole');
  
  if (userRole === 'developer') {
    return <DevDashboard />;
  }

  return <AdminDashboard />;
}