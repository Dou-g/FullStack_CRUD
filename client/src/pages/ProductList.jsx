import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import productService from '../services/productService';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const produits = await productService.getProduits();
        setProducts(produits);
      } catch (error) {
        console.error('Erreur lors du chargement des produits :', error);
      }
    };
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      try {
        await productService.deleteProduit(id);
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression du produit :', {
          error: error.response?.data || error.message
        });
        alert('Échec de la suppression: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className='text-center py-3'>Liste des Produits</h2>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.nom}</td>
              <td>{product.categorie}</td>
              <td>{product.prix}</td>
              <td>{product.quantite}</td>
              <td>
                <Link 
                  to={`/products/${product._id}/edit`} 
                  className="btn btn-sm btn-warning me-2"
                >
                  Modifier
                </Link>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleDelete(product._id)} // Corrigé: product._id au lieu de product.id
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/products/new" className="btn btn-primary mb-3">
        Ajouter un Produit
      </Link>
    </div>
  );
}