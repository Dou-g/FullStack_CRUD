import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FiGrid, 
  FiUserPlus, 
  FiLogIn,
  FiLogOut
} from 'react-icons/fi';
import auth from '../services/auth';

export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated());

  // Met à jour l'état d'authentification après une action (connexion/déconnexion)
  const handleLogout = () => {
    auth.logout();
    setIsAuthenticated(false); // Met à jour l'état après déconnexion
  };

  useEffect(() => {
    // Vérifie l'état d'authentification au chargement du composant
    setIsAuthenticated(auth.isAuthenticated());
    const handleAuthChange = () => {
      setIsAuthenticated(auth.isAuthenticated());
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <span className="text-primary">Gestion Stock</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Tableau de bord */}
            <Nav.Link as={Link} to="/dashboard" className="d-flex align-items-center">
              <FiGrid className="me-1" />
              <span className="d-lg-inline d-inline">Tableau de bord</span>
            </Nav.Link>

            {isAuthenticated ? (
              // Si connecté
              <>
                <Nav.Link 
                  onClick={handleLogout} 
                  className="d-flex align-items-center"
                >
                  <FiLogOut className="me-1" />
                  <span className="d-lg-inline d-inline">Déconnexion</span>
                </Nav.Link>
              </>
            ) : (
              // Si non connecté
              <>
                <Nav.Link as={Link} to="/inscription" className="d-flex align-items-center">
                  <FiUserPlus className="me-1" />
                  <span className="d-none d-lg-inline">Inscription</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/connexion" className="d-flex align-items-center">
                  <FiLogIn className="me-1" />
                  <span className="d-none d-lg-inline d-inline">Connexion</span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}