import api from './api';

const productService = {
  async getProduits() {
    const response = await api.get('/produits'); // Récupérer tous les produits
    return response.data;
  },

  async createProduit(produit) {
    const response = await api.post('/produits', produit); // Ajouter un produit
    return response.data;
  },

  async updateProduit(id, produit) {
    const response = await api.put(`/produits/${id}`, produit); // Mettre à jour un produit
    return response.data;
  },

  async deleteProduit(id) {
    const response = await api.delete(`/produits/${id}`); // Supprimer un produit
    return response.data;
  },

  async getStats() {
    const response = await api.get('/produits/stats'); // Récupérer les statistiques des produits
    return response.data;
  }
};

export default productService;