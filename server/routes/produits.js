const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Récupérer tous les produits
router.get('/', async (req, res) => {
  try {
    const produits = await Product.find();
    res.json(produits);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Récupérer les statistiques
router.get('/stats', async (req, res) => {
  try {
    const totalProduits = await Product.countDocuments();
    const produitsFaibleStock = await Product.countDocuments({ quantite: { $lt: 10 } });
    const valeurStock = await Product.aggregate([
      { $group: { _id: null, total: { $sum: { $multiply: ['$prix', '$quantite'] } } } },
    ]);
    const categoriePopulaire = await Product.aggregate([
      { $group: { _id: '$categorie', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    res.json({
      totalProduits,
      produitsFaibleStock,
      valeurStock: valeurStock[0]?.total || 0,
      categoriePopulaire: categoriePopulaire[0]?._id || 'Aucune',
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Ajouter un produit
router.post('/', async (req, res) => {
  try {
    const produit = new Product(req.body);
    const nouveauProduit = await produit.save();
    res.status(201).json(nouveauProduit);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du produit' });
  }
});

// Mettre à jour un produit
router.put('/:id', async (req, res) => {
  try {
    const produit = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(produit);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du produit' });
  }
});

// Supprimer un produit
router.delete('/:id', async (req, res) => {
  try {
    const produit = await Product.findByIdAndDelete(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json({ message: 'Produit supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;