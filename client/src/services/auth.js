import api from './api';

const authService = {
  async register(userData) {
    const response = await api.post('/auth/inscription', userData);
    return response.data;
  },

  async login(credentials) {
    try {
      const response = await api.post('/auth/connexion', credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la connexion :', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  },

  getToken() {
    return localStorage.getItem('token');
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/connexion';
    window.dispatchEvent(new Event('authChange'));
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
};

export default authService;