import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import productService from '../services/productService';

const categories = ['Huile', 'Légumes', 'Produits laitiers', 'Épicerie', 'Riz', 'Eau Minérale', 'Sucre', 'Boisson'];

export default function ProductForm() {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    nom: '',
    categorie: '',
    prix: 0,
    quantite: 0,
  });

  // Charger les données du produit si un ID est présent
  useEffect(() => {
    if (id) {
      const loadProduct = async () => {
        try {
          const produits = await productService.getProduits();
          const foundProduct = produits.find(p => p._id === parseInt(id));
          if (foundProduct) setProduct(foundProduct);
        } catch (error) {
          console.error('Erreur lors du chargement du produit :', error);
        }
      };
      loadProduct();
    }
  }, [id]);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Données envoyées :', product);
    try {
      if (id) {
        // Mise à jour d'un produit existant
        await productService.updateProduit(id, product);
        console.log('Produit mis à jour');
      } else {
        // Création d'un nouveau produit
        await productService.createProduit(product);
        console.log('Produit créé');
      }
      navigate('/products'); // Redirige vers la liste des produits
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du produit :', error);
    }
  };

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'prix' || name === 'quantite' ? parseFloat(value) : value,
    }));
  };

  return (
    <Container className="mt-4">
      <h2 className='text-center'>{id ? 'Modifier' : 'Ajouter'} un Produit</h2>
      <Form onSubmit={handleSubmit}>
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

        <Form.Group className="mb-3">
          <Form.Label>Prix</Form.Label>
          <Form.Control
            type="number"
            name="prix"
            value={product.prix}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantité</Form.Label>
          <Form.Control
            type="number"
            name="quantite"
            value={product.quantite}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {id ? 'Modifier' : 'Ajouter'}
        </Button>
      </Form>
    </Container>
  );
}