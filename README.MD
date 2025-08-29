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
  "password": "MonMotDePasse123!",
  "confirmPassword": "MonMotDePasse123!"
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

- `400` : Champs manquants, mots de passe différents, format email invalide, mot de passe faible, email déjà utilisé
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
Page HTML avec confirmation + token JWT pour tests

**Erreurs possibles :**

- `400` : Token invalide, expiré ou compte déjà vérifié

#### Mise à jour du profil

**PUT** `/api/auth/update-profile`

**Headers :**

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Body (JSON) :**

```json
{
  "niveau": "intermediaire",
  "objectifs": ["prise de masse", "force"]
}
```

**Réponse succès (200) :**

```json
{
  "message": "Profil mis à jour avec succès !",
  "user": {
    "id": "64f1234567890abcdef",
    "nom": "John Doe",
    "email": "john@example.com",
    "niveau": "intermediaire",
    "objectifs": ["prise de masse", "force"],
    "profileCompleted": true,
    "emailVerified": true
  }
}
```

**Options disponibles :**

- **Niveaux** : `debutant`, `intermediaire`, `avance`
- **Objectifs** : `perte de poids`, `prise de masse`, `entretien`, `force`

**Erreurs possibles :**

- `401` : Token manquant ou invalide
- `400` : Niveau ou objectifs invalides
- `404` : Utilisateur non trouvé

## 🔧 Test avec Insomnia

### 1. Test d'inscription

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "Test User",
  "email": "test@example.com",
  "password": "TestPass123!",
  "confirmPassword": "TestPass123!"
}
```

### 2. Vérification email

1. Vérifiez votre boîte mail
2. Cliquez sur le lien de vérification
3. Copiez le token JWT affiché sur la page
4. Ou testez directement : `GET http://localhost:5000/api/auth/verify-email/TOKEN`

### 3. Test mise à jour profil

```
PUT http://localhost:5000/api/auth/update-profile
Authorization: Bearer <COLLER_LE_TOKEN_JWT_ICI>
Content-Type: application/json

{
  "niveau": "avance",
  "objectifs": ["prise de masse", "force"]
}
```

### 4. Tests d'erreurs

```json
// Mots de passe différents
{
  "username": "Test",
  "email": "test@example.com",
  "password": "TestPass123!",
  "confirmPassword": "AutrePass456!"
}

// Email invalide
{
  "username": "Test",
  "email": "email-invalide",
  "password": "TestPass123!",
  "confirmPassword": "TestPass123!"
}

// Mot de passe faible
{
  "username": "Test",
  "email": "test@example.com",
  "password": "123",
  "confirmPassword": "123"
}

// Champs manquants
{
  "username": "Test",
  "email": "test@example.com",
  "password": "TestPass123!"
  // confirmPassword manquant
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
│   ├── email.js              # Service d'envoi d'emails + HTML pages
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
- ✅ Confirmation de mot de passe obligatoire
- ✅ Validation stricte des entrées
- ✅ Protection CORS activée
- ✅ Vérification email obligatoire
- ✅ Tokens JWT avec expiration (7 jours)
- ✅ Sanitisation des données (trim, lowercase)
- ✅ Code modulaire et sécurisé

## 🔄 Prochaines étapes

1. Implémenter la fonction `login` complète
2. Créer middleware d'authentification réutilisable
3. Développer les routes programmes/exercices
4. Ajouter système de reset mot de passe
5. Optimiser les validations avec middleware
6. Créer le frontend React

## 🏗️ Architecture

Le code suit une architecture modulaire avec séparation des responsabilités :

- **Controllers** : Logique métier et validation
- **Models** : Schémas de données MongoDB
- **Utils** : Services réutilisables (email, validation)
- **Routes** : Configuration des endpoints API

## 🧪 Workflow complet de test

1. **Inscription** → Email de vérification envoyé
2. **Vérification email** → Compte activé + Token JWT récupéré
3. **Mise à jour profil** → Niveau et objectifs définis
4. **Utilisateur complet** → Prêt pour l'utilisation

## 🐛 Debug

Pour voir les logs détaillés, activez le mode debug dans `authController.js` en ajoutant des `console.log()`.

---

**Auteur :** Ewen Larrieu  
**Version :** 2.0.0 - Authentification complète avec profil utilisateur
