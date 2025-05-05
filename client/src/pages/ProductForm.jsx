import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import productService from '../services/productService';

const categories = ['Huile', 'Légumes', 'Produits laitiers', 'Épicerie', 'Riz', 'Eau Minérale', 'Sucre', 'Boisson'];

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    nom: '',
    categorie: categories[0],
    prix: 0,
    quantite: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      const loadProduct = async () => {
        setLoading(true);
        try {
          const produits = await productService.getProduits();
          const foundProduct = produits.find(p => p._id === id);
          if (foundProduct) {
            setProduct({
              ...foundProduct,
              prix: parseFloat(foundProduct.prix),
              quantite: parseFloat(foundProduct.quantite)
            });
          }
        } catch (error) {
          setError('Erreur lors du chargement du produit');
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (id) {
        await productService.updateProduit(id, product);
        setSuccess('Produit mis à jour avec succès');
      } else {
        await productService.createProduit(product);
        setSuccess('Produit créé avec succès');
      }
      setTimeout(() => navigate('/products'), 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'prix' || name === 'quantite' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCancel = () => {
    if (window.confirm('Voulez-vous vraiment annuler ? Les modifications non enregistrées seront perdues.')) {
      navigate('/products');
    }
  };

  if (loading) return <Container className="mt-4 text-center">Chargement...</Container>;

  return (
    <Container className="mt-4">
      <h2 className='text-center mb-4'>{id ? 'Modifier' : 'Ajouter'} un Produit</h2>
      
      {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
      {success && <Alert variant="success" className="mb-4">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nom du Produit</Form.Label>
              <Form.Control
                type="text"
                name="nom"
                value={product.nom}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Catégorie</Form.Label>
              <Form.Select
                name="categorie"
                value={product.categorie}
                onChange={handleChange}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                name="prix"
                value={product.prix}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type="number"
                name="quantite"
                value={product.quantite}
                onChange={handleChange}
                min="0"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-3 mt-4">
          {id && (
            <Button 
              variant="outline-danger" 
              onClick={handleCancel}
              disabled={loading}
            >
              Annuler
            </Button>
          )}
          <Button 
            variant="primary" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'En cours...' : (id ? 'Modifier' : 'Ajouter')}
          </Button>
        </div>
      </Form>
    </Container>
  );
}