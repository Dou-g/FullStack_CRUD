import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FiGrid, 
  FiUserPlus, 
  FiLogIn,
  FiLogOut,
  FiList,
  FiPlusSquare,
  FiTag
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../styles/style.css';

export default function Navigation() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Navbar bg="light" expand="lg" className="custom-navbar shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="brand-logo fw-bold">
          <span className="text-primary">Gestion Stock</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {/* Tableau de bord - Toujours visible */}
            <Nav.Link as={Link} to="/dashboard" className="nav-item">
              <FiGrid className="icon" />
              <span className="nav-text">Tableau de bord</span>
            </Nav.Link>

            {isAuthenticated ? (
              <>
                {/* Menu Produits - Seulement visible quand connecté */}
                <NavDropdown 
                  title={
                    <div className="d-flex align-items-center">
                      <FiTag className="icon" />
                      <span className="nav-text">Produits</span>
                    </div>
                  } 
                  id="products-dropdown"
                  className="custom-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/products" className="dropdown-item">
                    <FiList className="me-2" />
                    Liste des produits
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/products/new" className="dropdown-item">
                    <FiPlusSquare className="me-2" />
                    Ajouter un produit
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/products/by-category" className="dropdown-item">
                    <FiTag className="me-2" />
                    Par catégorie
                  </NavDropdown.Item>
                </NavDropdown>

                {/* Déconnexion */}
                <Nav.Link onClick={logout} className="nav-item">
                  <FiLogOut className="icon" />
                  <span className="nav-text">Déconnexion</span>
                </Nav.Link>
              </>
            ) : (
              <>
                {/* Inscription/Connexion - Seulement visible quand déconnecté */}
                <Nav.Link as={Link} to="/inscription" className="nav-item">
                  <FiUserPlus className="icon" />
                  <span className="nav-text">Inscription</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/connexion" className="nav-item">
                  <FiLogIn className="icon" />
                  <span className="nav-text">Connexion</span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}