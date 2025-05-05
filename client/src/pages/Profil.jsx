import React from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { FiUser, FiMail, FiEdit } from 'react-icons/fi';
import auth from '../services/auth';

export default function Profil() {
  // Récupère les infos de l'utilisateur connecté
  const utilisateur = auth.getUtilisateur();

  if (!utilisateur) {
    return <div className="text-center my-5">Aucune information utilisateur disponible.</div>;
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="text-center mb-4">
            <div className="bg-primary bg-opacity-10 d-inline-flex p-4 rounded-circle">
              <FiUser size={40} className="text-primary" />
            </div>
            <h2 className="mt-3">{utilisateur.nom || 'Profil'}</h2>
          </div>

          <Card className="mb-3">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <FiMail className="me-2" size={20} />
                <div>
                  <h6 className="mb-0">Email</h6>
                  <p className="mb-0">{utilisateur.email || 'Non renseigné'}</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <FiUser className="me-2" size={20} />
                <div>
                  <h6 className="mb-0">Compte créé le</h6>
                  <p className="mb-0">
                    {new Date(utilisateur.dateCreation || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          <div className="d-flex justify-content-end">
            <Button variant="primary">
              <FiEdit className="me-1" />
              Modifier le profil
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}