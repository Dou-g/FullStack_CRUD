import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import auth from '../services/auth';

const ProtectedRoute = () => {
  if (!auth.isAuthenticated()) {
    // Redirige vers la page de connexion si non authentifié
    return <Navigate to="/connexion" replace />;
  }

  // Affiche la route enfant si authentifié
  return <Outlet />;
};

export default ProtectedRoute;