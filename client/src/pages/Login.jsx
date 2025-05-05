import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth';
import '../styles/style.css'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login({ email, password: motDePasse });
      console.log('Connexion réussie :', data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur lors de la connexion :', err.message);
      setErreur(err.message);
    }
  };

  return (
    <Container className="mt-5 login-container">
      <Card className="shadow-sm" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Connexion</h2>
          
          {erreur && <Alert variant="danger">{erreur}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="votre@email.com"
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

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Se connecter
            </Button>

            <div className="text-center">
              <Link to="/inscription" className="text-decoration-none">
                Créer un compte
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}