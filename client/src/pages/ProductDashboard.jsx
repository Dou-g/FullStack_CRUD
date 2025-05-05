import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Table } from 'react-bootstrap';
import { 
  FiBox, 
  FiDollarSign, 
  FiTrendingUp, 
  FiAlertTriangle,
  FiPieChart,
  FiClock
} from 'react-icons/fi';
import productService from '../services/productService';
import ChartProduits from '../components/ChartProduits';
import '../styles/style.css';

const formatNumber = (value) => {
  const num = Number(value);
  return isNaN(num) ? '0'.padEnd() : num.toFixed();
};

const StatCard = ({ title, value, icon, bgColor, textColor }) => (
  <Card className="h-100 shadow-sm dashboard-card">
    <Card.Body className="p-2 p-sm-3">
      <div className="d-flex align-items-center">
        <div className={`dashboard-icon ${bgColor}`}>
          {React.cloneElement(icon, { size: 24, className: `icon-spacing ${textColor}` })}
        </div>
        <div className='mx-2'>
          <Card.Title className="text-muted mb-1 small-sm">{title}</Card.Title>
          <h3 className="mb-0 fs-5 fs-sm-4">{value}</h3>
        </div>
      </div>
    </Card.Body>
  </Card>
);

export default function TableauDeBord() {
  const [stats, setStats] = useState({
    totalProduits: 0,
    produitsFaibleStock: 0,
    valeurStock: 0,
    categoriePopulaire: ''
  });

  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [statsData, produitsData] = await Promise.all([
          productService.getStats(),
          productService.getProduits()
        ]);

        setStats({
          totalProduits: Number(statsData.totalProduits) || 0,
          produitsFaibleStock: Number(statsData.produitsFaibleStock) || 0,
          valeurStock: Number(statsData.valeurStock) || 0,
          categoriePopulaire: statsData.categoriePopulaire || 'Aucune'
        });

        setProduits(produitsData.map(p => ({
          ...p,
          prix: Number(p.prix) || 0,
          quantite: Number(p.quantite) || 0,
          dateAjout: p.createdAt
        })));

      } catch (err) {
        console.error('Erreur:', err);
        setError('Échec du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const derniersProduits = [...produits]
    .sort((a, b) => new Date(b.dateAjout || 0) - new Date(a.dateAjout || 0))
    .slice(0, 5);

  if (loading) return <div className="text-center my-5">Chargement...</div>;
  if (error) return <div className="alert alert-danger my-5">{error}</div>;

  return (
    <Container className="mt-3 mt-md-4 px-2 px-sm-3">
      {/* Titre principal */}
      <h2 className="dashboard-title mb-3 mb-md-4 fs-4 fs-md-3">
        <FiPieChart className="me-2" />
        Tableau de Bord
      </h2>

      {/* Cartes de statistiques */}
      <Row className="g-3 mb-3 mb-md-4">
        <Col xs={6} md={3} sm={6}>
          <StatCard
            title="Produits"
            value={stats.totalProduits}
            icon={<FiBox className='icon-spacing'/>}
            bgColor="bg-primary bg-opacity-10"
            textColor="text-primary"
          />
        </Col>
        <Col xs={6} md={3} sm={6}>
          <StatCard 
            title="Valeur Stock"
            value={`${formatNumber(stats.valeurStock)}`}
            icon={<FiDollarSign className='icon-spacing'/>}
            bgColor="bg-success bg-opacity-10"
            textColor="text-success"
          />
        </Col>
        <Col xs={6} md={3} sm={6}>
          <StatCard
            title="Faible Stock"
            value={stats.produitsFaibleStock}
            icon={<FiAlertTriangle className='icon-spacing'/>}
            bgColor="bg-warning bg-opacity-10"
            textColor="text-warning"
          />
        </Col>
        <Col xs={6} md={3} sm={6}>
          <StatCard
            title="Top Catégorie"
            value={stats.categoriePopulaire}
            icon={<FiTrendingUp className='icon-spacing'/>}
            bgColor="bg-info bg-opacity-10"
            textColor="text-info"
          />
        </Col>
      </Row>

      {/* Graphique */}
      <Row className="g-3 mb-3 mb-md-4">
        <Col>
          <Card className="shadow-sm mb-3 mb-md-4">
            <Card.Body className="p-2 p-sm-3">
              <Card.Title className="mb-2 mb-md-3 fs-5 fs-md-4">Répartition des Produits</Card.Title>
              <div style={{ height: '250px' }} className="chart-container">
                <ChartProduits produits={produits} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Derniers Produits Ajoutés */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body className="p-2 p-sm-3">
              <Card.Title className="mb-2 mb-md-3 fs-5 fs-md-4">
                <FiClock className="me-2" />
                Derniers Produits Ajoutés
              </Card.Title>
              <div className="table-responsive">
                <Table striped hover className="dashboard-table mb-0">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Catégorie</th>
                      <th>Prix</th>
                      <th>Quantité</th>
                      <th>Date Ajout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {derniersProduits.map(produit => (
                      <tr key={produit._id}>
                        <td className="text-nowrap">{produit.nom || '-'}</td>
                        <td className="text-capitalize text-nowrap">{produit.categorie || '-'}</td>
                        <td className="text-nowrap">{formatNumber(produit.prix)}</td>
                        <td className={`text-nowrap ${produit.quantite < 10 ? 'text-danger fw-bold' : ''}`}>
                          {produit.quantite}
                        </td>
                        <td className="text-nowrap">{produit.dateAjout ? new Date(produit.dateAjout).toLocaleDateString() : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}