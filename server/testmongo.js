require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connexion MongoDB réussie');
  } catch (error) {
    console.error('Erreur de connexion MongoDB :', error.message);
  }
};

testConnection();