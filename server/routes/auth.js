const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');

// Route pour l'inscription
router.post('/inscription', register);

// Route pour la connexion
router.post('/connexion', login);

module.exports = router;