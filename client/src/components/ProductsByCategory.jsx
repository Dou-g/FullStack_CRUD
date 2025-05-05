import React, { useState, useEffect } from 'react';
import { Table, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import productService from '../services/productService';
import '../App.css';

export default function ProductsByCategory() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['Tous']);
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const produits = await productService.getProduits();
        setProducts(produits);
        
        // Extraction automatique des catégories
        const uniqueCategories = ['Tous', ...new Set(produits.map(p => p.categorie))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Tous') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p => 
        p.categorie.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [products, selectedCategory]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Chargement des produits...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Produits par Catégorie</h2>
      
      <Form.Group className="mb-4 w-25">
        <Form.Label>Catégorie</Form.Label>
        <Form.Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <div className="mb-3">
        <Badge bg="primary" className="fs-6">
          {filteredProducts.length} produit(s) dans cette catégorie
        </Badge>
      </div>

      {filteredProducts.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Libellé</th>
              <th>Prix unitaire</th>
              <th>Quantité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product._id}>
                <td>{product.nom}</td>
                <td>{product.prix}</td>
                <td>{product.quantite}</td>
                <td>
                  <Link 
                    to={`/products/${product._id}/edit`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">
          Aucun produit trouvé dans la catégorie "{selectedCategory}"
        </Alert>
      )}
    </div>
  );
}