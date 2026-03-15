import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'admin' | 'developer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    // If user doesn't have the required role, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
