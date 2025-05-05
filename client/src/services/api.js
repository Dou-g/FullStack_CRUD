import axios from 'axios';
import auth from './auth';

// Crée une instance Axios configurée
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Intercepteur pour ajouter automatiquement le token JWT
api.interceptors.request.use(config => {
  const token = auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      auth.deconnexion();
      window.location.href = '/connexion';
    }
    return Promise.reject(error);
  }
);

// Service des produits
export const productService = {
  async getProducts() {
    const response = await api.get('/produits');
    return response.data;
  },

  async createProduct(product) {
    const response = await api.post('/produits', product);
    return response.data;
  },

  async updateProduct(id, product) {
    const response = await api.put(`/produits/${id}`, product);
    return response.data;
  },

  async deleteProduct(id) {
    const response = await api.delete(`/produits/${id}`);
    return response.data;
  }
};

// Service d'authentification
export const authService = {
  async register(userData) {
    const response = await api.post('/auth/inscription', userData);
    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/auth/connexion', credentials);
    return response.data;
  }
};

export default api;