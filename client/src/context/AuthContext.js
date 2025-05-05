// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import auth from '../services/auth'; // Importez votre service d'authentification

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated());

  // Vérifie l'état d'authentification au chargement
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(auth.isAuthenticated());
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    await auth.login(credentials); // Appel à votre service de connexion
    setIsAuthenticated(true);
  };

  const logout = () => {
    auth.logout(); // Appel à votre service de déconnexion
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personnalisé pour utiliser le contexte
export function useAuth() {
  return useContext(AuthContext);
}