# 📋 Guide de déploiement Backend Render

## ✅ Variables d'environnement à configurer sur Render :

### 🔑 **Obligatoires :**
```
NODE_ENV=production
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/progfit?retryWrites=true&w=majority
JWT_SECRET=votre_secret_jwt_tres_securise_minimum_32_caracteres
EMAIL_USER=votre.email@gmail.com
EMAIL_PASS=votre_mot_de_passe_application_gmail
```

### 📝 **Comment obtenir EMAIL_PASS (Gmail) :**
1. Aller dans votre compte Google
2. Sécurité → Validation en 2 étapes → Mots de passe d'application
3. Générer un mot de passe pour "Progfit Backend"
4. Utiliser ce mot de passe (16 caractères) comme EMAIL_PASS

## 🚀 **Étapes de déploiement :**

1. **Aller sur Render.com** et créer un compte
2. **New → Web Service**
3. **Connecter votre repo GitHub** : `ewenlarrieu/Progfit`
4. **Configurer le service :**
   - Name: `progfit-backend`
   - Branch: `github-pages-deploy`
   - Root Directory: `back-end`
   - Build Command: `npm install`
   - Start Command: `npm start`
   
5. **Ajouter les variables d'environnement** (voir ci-dessus)
6. **Déployer** et attendre que ce soit en ligne

## 🌐 **URL finale :**
Votre backend sera disponible à : `https://progfit-backend.onrender.com`

## 🔧 **Test des routes :**
- GET `https://progfit-backend.onrender.com/api/programmes`
- POST `https://progfit-backend.onrender.com/api/auth/login`