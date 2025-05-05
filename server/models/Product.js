// filepath: [Product.js](http://_vscodecontentref_/2)
const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Le nom du produit est requis'],
    },
    categorie: {
      type: String,
      required: [true, 'La catégorie est requise'],
    },
    prix: {
      type: Number,
      required: [true, 'Le prix est requis'],
    },
    quantite: {
      type: Number,
      required: [true, 'La quantité est requise'],
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

module.exports = mongoose.model('Product', productSchema);