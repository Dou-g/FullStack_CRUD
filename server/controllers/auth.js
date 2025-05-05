const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'e1a5e0512db341a943ed00411a6df8c84a8f08566b3232dbf1a09eef954ddb7e';

// Inscription
exports.register = async (req, res) => {
  try {
    const { nom, email, password } = req.body;

    // Validation basique
    if (!nom || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await User.findOne({ email });
    if (utilisateurExistant) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Créer un nouvel utilisateur
    const utilisateur = await User.create({ nom, email, password });

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: { id: utilisateur._id, nom: utilisateur.nom, email: utilisateur.email },
    });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'inscription' });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Vérifier si l'utilisateur existe
    const utilisateur = await User.findOne({ email });
    if (!utilisateur) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier le mot de passe
    const isMatch = await utilisateur.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: utilisateur._id, email: utilisateur.email }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({
      token,
      user: { id: utilisateur._id, nom: utilisateur.nom, email: utilisateur.email },
    });
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion' });
  }
};