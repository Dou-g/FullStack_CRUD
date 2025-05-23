# Product CRUD App
Une application complète de gestion de produits avec un backend Node.js et un frontend React.

---

## Fonctionnalités

- **CRUD Produits** : Ajouter, modifier, supprimer et afficher des produits.
- **Tableau de bord** : Statistiques sur les produits (valeur totale, faible stock, etc.).
- **Authentification** : Inscription, connexion et gestion des utilisateurs.
- **Graphiques** : Répartition des produits par catégorie.
- **Responsive** : Interface adaptée aux mobiles et aux ordinateurs.

---

## Installation

### Prérequis
- **Node.js** ( Version 16 ou supérieur)
- **MongoDB Atlas** (Ou une instance MongoDB locale)
- **Git** (Pour cloner le projet)

### Étapes

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Dou-g/FullStack_CRUD.git)
   cd product-crud-app
2. **Configurer le Backend**
   - Accédez au dossier server :
     ```bash
     cd server
   - Installer les dépendances :
     ```bash
     npm install
   - Créer un fichier .env dans le dossier server et ajouter les variables suivantes :
     ```bash
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/gestion_produits?retryWrites=true&w=majority
     JWT_SECRET=your_jwt_secret
     JWT_EXPIRE=30d
     PORT=5000
   - NB : Remplacer **username** par votre nom d'utilisateur qui a accés au base de données et **password** par son mot de passe

3. **Configurer le Frontend**
   - Accéder au dossier client
     ```bash
     cd ../client
   - Installer les dépendances
     ```bash
     npm install
4. Démarrer l'Application
   - Démarrer le Backend
     ```bash
     cd ../server
     node server.js
   - Démarrer le Frontend
     ```bash
     cd ../client
     npm start
5. Accéder á l'application
   - Ouvrer votre navigateur et accédez á :
     ```http://localhost:3000```

---

# Structure du projet

```
product-crud-app/
├── client/                    # Frontend (React)
│   ├── public/                # Fichiers statiques (HTML, favicon)
│   └── src/                   # Code source React
│       ├── components/        # Composants réutilisables
│       ├── pages/             # Pages de l'application
│       ├── services/          # Services pour les appels API
│       ├── context/           # Contextes React pour l'état global de l'application
|       └── styles/            # Fichiers CSS/SCSS
│
├── server/                    # Backend (Node.js/Express)
│   ├── config/                # Configuration (DB, variables d'environnement)
│   ├── controllers/           # Logique métier
│   ├── models/                # Schémas Mongoose
│   └── routes/                # Définition des routes API
│
├── .gitignore
├── README.md                  # Documentation du projet
└── LICENSE
```

### Légende :
- **client** : Application React avec architecture modulaire
- **server** : API REST avec architecture MVC
- Fichiers racine : Configuration générale du projet

---

## API Endpoints

### Authentification

- **POST** ```/auth/inscription``` : Inscription d'un utilisateur
- **POST** ```auth/connexion``` : Connexion d'un utilisateur

### Produits

- **GET** ```produits``` : Récupérer tous les produits
- **POST** ```/produits``` : Ajouter un nouveau produit.
- **PUT** ```/produits/:id``` : Mettre à jour un produit.
- **DELETE** ```/produits/:id``` : Supprimer un produit.
- **GET** ```/produits/stats``` : Récupérer les statistiques des produits.

---

## Technologies Utilisées

Backend

- **Node.js** : Environnement d'exécution JavaScript.
- **Express.js** : Framework pour créer des API REST.
- **Mongoose** : ODM pour MongoDB.
- **JWT** : Authentification basée sur des tokens.

Frontend

- **React.js** : Bibliothèque pour créer des interfaces utilisateur.
- **React Router** : Gestion des routes côté client.
- **Bootstrap** : Framework CSS pour un design responsive.
- **Chart.js** : Graphiques interactifs.

---

## Captures d'écran

![Screenshot 2025-05-05 152610](https://github.com/user-attachments/assets/6453314a-3819-4dce-a703-48aa35c4d125)
![Screenshot 2025-05-05 152536](https://github.com/user-attachments/assets/c4a92309-d179-48cf-b7a7-2ed5899331e1)
![Screenshot 2025-05-05 152516](https://github.com/user-attachments/assets/5ec7b0b3-d87f-474a-a6f3-bdf8f3985338)

---

## Contribuer

Les contributions sont les bienvenues ! Suivez ces étapes pour contribuer :

1. Forker ce projet
2. Créer une branche pour vos modifications

   ```bash
   git checkout -b feature/nom-de-la-fonctionnalite

3 . Faites vos modifications et committez-les
   ```git commit -m "Ajout d'une nouvelle fonctionnalité" ```

4. Poussez vos modifications
   ```bash
   git push origin feature/nom-de-la-fonctionnalite

5. Créez une Pull Request

---

## Auteur

- **Nom** : Abdou
- **Email** : gueyeabdou657@gmail.com
- **GitHub** : https://github.com/Dou-g
