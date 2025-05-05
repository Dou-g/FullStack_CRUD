import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../services/auth';
import '../styles/style.css';

export default function Register() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (motDePasse !== confirmation) {
      setErreur('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      await auth.register({ nom, email, password: motDePasse });
      navigate('/connexion');
    } catch (err) {
      setErreur("Erreur lors de l'inscription");
    }
  };

  return (
    <Container className="mt-5 register-container">
      <Card className="shadow-sm" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Inscription</h2>
          
          {erreur && <Alert variant="danger">{erreur}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom complet</Form.Label>
              <Form.Control
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required placeholder='Nom'
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control 
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
                placeholder="••••••••"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirmer le mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                required
                placeholder="••••••••"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              S'inscrire
            </Button>

            <div className="text-center">
              <Link to="/connexion" className="text-decoration-none">
                Déjà un compte ? Se connecter
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}