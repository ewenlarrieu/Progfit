# Progfit - Application de Gestion de Programmes d'Entraînement

**Progfit** est une application web complète permettant aux utilisateurs de suivre des programmes d'entraînement personnalisés, de gérer leurs séances et de suivre leur progression.

## Fonctionnalités

### Pour les utilisateurs :

- **Authentification sécurisée** : Inscription, connexion avec JWT
- **Tableau de bord personnalisé** : Vue d'ensemble de la progression
- **Catalogue de programmes** : Navigation et sélection de programmes d'entraînement
- **Suivi des séances** : Validation des séances jour par jour
- **Validation hebdomadaire** : Passage à la semaine suivante après complétion
- **Historique** : Consultation des programmes terminés
- **Gestion du profil** : Modification des informations personnelles
- **Suppression de compte** : Option de suppression complète des données

### Pour les administrateurs :

- **Gestion des programmes** : Création, modification et suppression
- **Gestion des séances** : Ajout d'exercices avec séries et répétitions
- **Interface admin dédiée** : Accès aux fonctionnalités d'administration

---

## Technologies utilisées

### Frontend

- **React** - Bibliothèque JavaScript pour l'interface utilisateur
- **React Router DOM** - Navigation entre les pages
- **Vite** - Build tool et serveur de développement
- **Tailwind CSS** - Framework CSS utility-first
- **CSS pur** - Pour certains composants (Login)
- **SASS** - Préprocesseur CSS

### Backend

- **Node.js** - Environnement d'exécution JavaScript
- **Express** - Framework web pour Node.js
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification par tokens
- **bcrypt** - Hachage des mots de passe
- **CORS** - Gestion des requêtes cross-origin
- **dotenv** - Gestion des variables d'environnement

---

## Installation

### 1. Cloner le projet

```
git clone https://github.com/ewenlarrieu/Progfit.git
cd Progfit
```

### 2. Installation du Backend

cd back-end
npm install

### 3. Installation du Frontend

cd ../client
npm install

---

## Configuration

### Configuration du Backend

1. Créez un fichier `.env` dans le dossier `back-end` :

2. Ajoutez les variables d'environnement suivantes dans `.env` :

```env
# Port du serveur
PORT=5000

# URL de connexion MongoDB
MONGODB_URI=mongodb://localhost:27017/progfit
# Ou pour MongoDB Atlas :
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/progfit

# Clé secrète pour JWT (générez une clé aléatoire sécurisée)
JWT_SECRET=votre_cle_secrete_tres_longue_et_securisee

# Configuration email (optionnel, pour les fonctionnalités d'email)
EMAIL_USER=votre_email@example.com
EMAIL_PASS=votre_mot_de_passe
```

### Configuration du Frontend

1. Créez un fichier `src/config/api.js` dans le dossier `client/src/config/` (s'il n'existe pas déjà) :

```javascript
export const API_URL = "http://localhost:5000";
```

---

## Utilisation

### Démarrer le Backend

```bash
cd back-end
npm run dev
```

Le serveur démarre sur `http://localhost:5000`

### Démarrer le Frontend

Dans un nouveau terminal :

```bash
cd client
npm run dev
```

### Accéder à l'application

Ouvrez votre navigateur et accédez à : **http://localhost:5173**

### Créer un compte administrateur

Pour accéder aux fonctionnalités d'administration, vous devez créer un compte avec le rôle "admin" directement dans la base de données MongoDB :

1. Inscrivez-vous normalement via l'interface
2. Connectez-vous à MongoDB et modifiez le champ `role` de votre utilisateur :

## Structure du projet

```
Progfit/
│
├── back-end/                  # Backend Node.js
│   ├── controllers/           # Contrôleurs (logique métier)
│   ├── models/               # Modèles Mongoose
│   ├── routes/               # Routes Express
│   ├── middleware/           # Middlewares (auth, admin)
│   ├── app.js                # Point d'entrée du serveur
│   ├── package.json          # Dépendances backend
│   └── .env                  # Variables d'environnement (à créer)
│
├── client/                   # Frontend React
│   ├── public/              # Fichiers statiques
│   ├── src/
│   │   ├── assets/          # Images et ressources
│   │   ├── components/      # Composants React (NavBar, Logo, etc.)
│   │   ├── pages/           # Pages de l'application
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Programs.jsx
│   │   │   ├── DetailsProgramms.jsx
│   │   │   ├── SeanceEntrainement.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── PolitiqueConfidentialite.jsx
│   │   ├── config/          # Configuration (API URL)
│   │   ├── style/           # Fichiers CSS
│   │   ├── App.jsx          # Composant principal
│   │   └── main.jsx         # Point d'entrée React
│   ├── package.json         # Dépendances frontend
│   └── vite.config.js       # Configuration Vite
│
└── README.md
```

---

## API Documentation

### Endpoints principaux

#### Authentification

- `POST /api/auth/register` - Inscription d'un nouvel utilisateur
- `POST /api/auth/login` - Connexion
- `GET /api/auth/profile` - Récupérer le profil (authentifié)
- `PUT /api/auth/update-profile` - Mettre à jour le profil
- `DELETE /api/auth/delete-account` - Supprimer le compte

#### Programmes

- `GET /api/programmes` - Liste de tous les programmes
- `GET /api/programmes/:id` - Détails d'un programme
- `POST /api/programmes` - Créer un programme (admin)
- `PUT /api/programmes/:id` - Modifier un programme (admin)
- `DELETE /api/programmes/:id` - Supprimer un programme (admin)

#### Programmes utilisateur

- `GET /api/user-programmes/current` - Programme actuel de l'utilisateur
- `POST /api/user-programmes/:id` - S'inscrire à un programme
- `POST /api/user-programmes/complete-seance` - Valider une séance
- `POST /api/user-programmes/validate-week` - Valider une semaine
- `DELETE /api/user-programmes/unsubscribe` - Se désinscrire d'un programme
- `GET /api/user-programmes/history` - Historique des programmes

### Authentification des requêtes

La plupart des endpoints nécessitent un token JWT dans le header :

```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

## Sécurité

- **Mots de passe** : Hachés avec bcrypt (10 rounds)
- **Authentification** : JWT avec expiration
- **Protection IDOR** : Toutes les opérations utilisateur vérifient l'ID depuis le token
- **Protection des routes** : Middleware de vérification du token
- **Routes admin** : Middleware de vérification du rôle administrateur
- **CORS** : Configuré pour accepter uniquement les origines autorisées

---

## Design et UX

- **Responsive** : Compatible desktop, tablette et mobile
- **Couleurs principales** :
  - Rouge primaire : `#E22807`
- **Police** : Poppins (Google Fonts)
- **Accessibilité** : Balises sémantiques HTML5, labels ARIA

---

### Le frontend ne se connecte pas au backend

Vérifiez que :

1. Le backend est démarré sur le port 5000
2. L'URL dans `client/src/config/api.js` est correcte
3. CORS est configuré dans le backend

## Scripts disponibles

### Backend

npm start # Démarre le serveur en production
npm run dev # Démarre le serveur en mode développement (avec nodemon)

### Frontend

npm run dev # Démarre le serveur de développement Vite
npm run build # Compile l'application pour la production

---

## Auteur

**Ewen Larrieu**

- GitHub: [@ewenlarrieu](https://github.com/ewenlarrieu)

---

## Remerciements

Merci d'utiliser Progfit ! Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.
