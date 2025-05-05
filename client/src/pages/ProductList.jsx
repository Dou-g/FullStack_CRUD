import React, { useState, useEffect } from 'react';
import { Button, Table, Form, InputGroup, Spinner, Alert, Badge } from 'react-bootstrap';
import { FiX, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import productService from '../services/productService';

const categories = ['Tous', 'Huile', 'Légumes', 'Produits laitiers', 'Épicerie', 'Riz', 'Eau Minérale', 'Sucre', 'Boisson'];
const sortOptions = [
  { value: 'nom-asc', label: 'Nom (A-Z)' },
  { value: 'nom-desc', label: 'Nom (Z-A)' },
  { value: 'prix-asc', label: 'Prix (Croissant)' },
  { value: 'prix-desc', label: 'Prix (Décroissant)' },
  { value: 'quantite-asc', label: 'Quantité (Croissante)' },
  { value: 'quantite-desc', label: 'Quantité (Décroissante)' }
];

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [sortBy, setSortBy] = useState('nom-asc');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const produits = await productService.getProduits();
        setProducts(produits);
        setError(null);
      } catch (error) {
        console.error('Erreur:', error);
        setError('Erreur lors du chargement des produits');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    // Filtrage et tri
    let result = [...products];
    
    // Filtre par catégorie
    if (selectedCategory !== 'Tous') {
      result = result.filter(p => p.categorie === selectedCategory);
    }
    
    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
    result = result.filter(p => 
      p.nom.toLowerCase().includes(term) || 
      p.categorie.toLowerCase().includes(term)
    );
    }
    
    // Tri
    result.sort((a, b) => {
      switch (sortBy) {
        case 'nom-asc': return a.nom.localeCompare(b.nom);
        case 'nom-desc': return b.nom.localeCompare(a.nom);
        case 'prix-asc': return a.prix - b.prix;
        case 'prix-desc': return b.prix - a.prix;
        case 'quantite-asc': return a.quantite - b.quantite;
        case 'quantite-desc': return b.quantite - a.quantite;
        default: return 0;
      }
    });
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      try {
        await productService.deleteProduit(id);
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error('Erreur:', error);
        alert(`Échec de la suppression: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center mb-4">
        <h2 className="me-0 pt-2 text-center">Liste des Produits</h2>
      </div>

      {/* Contrôles de filtrage */}
      <div className="row mb-4 g-3">
        <div className="col-md-4">
          <Form.Group>
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
        </div>
        
        <div className="col-md-4">
          <Form.Group>
            <Form.Label>Trier par</Form.Label>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
        
        <div className="col-md-4">
          <Form.Group className="mb-3">
            <Form.Label>Rechercher</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Rechercher produits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              {/* Bouton unique qui change d'icône */}
              <Button 
                variant="outline-secondary" 
                onClick={() => searchTerm ? setSearchTerm('') : null}
                disabled={!searchTerm}
              >
                {searchTerm ? <FiX /> : <FiSearch />}
              </Button>
            </InputGroup>
          </Form.Group>
        </div>
        
      </div>

      {/* Statistiques */}
      <div className="mb-3">
        <Badge bg="info" className="me-2">
          Total: {products.length}
        </Badge>
        {selectedCategory !== 'Tous' && (
          <Badge bg="primary" className="me-2">
            {selectedCategory}: {filteredProducts.length}
          </Badge>
        )}
        {searchTerm && (
          <Badge bg="secondary">
            Résultats pour: "{searchTerm}"
          </Badge>
        )}
      </div>

      {/* Affichage des erreurs */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Tableau des produits */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
          <p>Chargement des produits...</p>
        </div>
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>Nom</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product._id}>
                    <td>{product.nom}</td>
                    <td>
                      <Badge bg="info">{product.categorie}</Badge>
                    </td>
                    <td>{product.prix.toFixed(2)}</td>
                    <td>
                      <span className={product.quantite < 10 ? 'text-danger fw-bold' : ''}>
                        {product.quantite}
                      </span>
                    </td>
                    <td className="text-center">
                      <Link 
                        to={`/products/${product._id}/edit`}
                        className="btn btn-sm btn-warning me-2"
                      >
                        <i className="fas fa-edit me-1"></i>Modifier
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(product._id)}
                      >
                        <i className="fas fa-trash me-1"></i>Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
          ) : (
            <Alert variant="info" className="text-center">
              Aucun produit trouvé {searchTerm && `pour "${searchTerm}"`}
            </Alert>
          )}
          <Link to="/products/new" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Ajouter un Produit
        </Link>
        </>
      )}
    </div>
  );
}