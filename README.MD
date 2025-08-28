# Progfit Backend API

Backend pour l'application Progfit - Plateforme de suivi de programmes sportifs.

## 🚀 Installation et démarrage

### Prérequis

- Node.js (v18+)
- MongoDB
- Gmail avec mot de passe d'application

### Installation

```bash
npm install
```

### Configuration

Créez un fichier `.env` avec :

```env
PORT=5000
MONGO_URL=votre-url-mongodb
JWT_SECRET=votre-secret-jwt
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-app
CLIENT_URL=http://localhost:3000
```

### Démarrage

```bash
npm start
```

Le serveur tourne sur `http://localhost:5000`

## 📋 API Documentation

### 🔐 Authentification

#### Inscription

**POST** `/api/auth/register`

**Body (JSON) :**

```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "MonMotDePasse123!"
}
```

**Réponse succès (201) :**

```json
{
  "message": "Compte créé avec succès ! Vérifiez votre email pour activer votre compte.",
  "user": {
    "id": "64f1234567890abcdef",
    "nom": "John Doe",
    "email": "john@example.com",
    "emailVerified": false
  }
}
```

**Erreurs possibles :**

- `400` : Champs manquants, format email invalide, mot de passe faible, email déjà utilisé
- `500` : Erreur serveur ou envoi email

**Validation mot de passe :**

- Minimum 8 caractères
- Au moins 1 majuscule
- Au moins 1 minuscule
- Au moins 1 chiffre
- Au moins 1 caractère spécial

#### Vérification Email

**GET** `/api/auth/verify-email/:token`

**Paramètres :**

- `token` : Token reçu par email

**Réponse succès (200) :**
Page HTML avec confirmation + token JWT

**Erreurs possibles :**

- `400` : Token invalide, expiré ou compte déjà vérifié

## 🔧 Test avec Insomnia/Postman

### 1. Test d'inscription

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "Test User",
  "email": "test@example.com",
  "password": "TestPass123!"
}
```

### 2. Vérification email

1. Vérifiez votre boîte mail
2. Cliquez sur le lien de vérification
3. Ou testez directement : `GET http://localhost:5000/api/auth/verify-email/TOKEN`

### 3. Tests d'erreurs

```json
// Email invalide
{
  "username": "Test",
  "email": "email-invalide",
  "password": "TestPass123!"
}

// Mot de passe faible
{
  "username": "Test",
  "email": "test@example.com",
  "password": "123"
}

// Champs manquants
{
  "username": "Test"
}
```

## 📁 Structure du projet

```
back-end/
├── controllers/
│   └── authController.js      # Logique d'authentification
├── models/
│   ├── User.js               # Modèle utilisateur
│   ├── Programme.js          # Modèle programme sportif
│   ├── Exercice.js           # Modèle exercice
│   └── Progression.js        # Modèle suivi progression
├── routes/
│   └── authRoutes.js         # Routes d'authentification
├── utils/
│   ├── email.js              # Service d'envoi d'emails
│   └── verifyPW.js           # Validation mot de passe
├── data/
│   ├── exercices.json        # Données exercices (à compléter)
│   └── programmes.json       # Données programmes (à compléter)
├── .env                      # Variables d'environnement
├── app.js                    # Configuration serveur
└── package.json              # Dépendances
```

## 🛡️ Sécurité

- ✅ Hachage bcrypt des mots de passe
- ✅ Validation stricte des entrées
- ✅ Protection CORS activée
- ✅ Vérification email obligatoire
- ✅ Tokens JWT avec expiration
- ✅ Sanitisation des données

## 🔄 Prochaines étapes

1. Implémenter la fonction `login`
2. Créer middleware d'authentification
3. Développer les routes programmes/exercices
4. Ajouter système de reset mot de passe
5. Créer le frontend React

## 🐛 Debug

Pour voir les logs détaillés, activez le mode debug dans `authController.js` en ajoutant des `console.log()`.

---

**Auteur :** Ewen Larrieu  
**Version :** 1.0.0
