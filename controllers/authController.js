import User from "../models/User.js";
import jwt from "jsonwebtoken";
import verifyPW from "../utils/verifyPW.js";
import {
  sendVerificationEmail,
  generateVerificationToken,
} from "../utils/email.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Validation des champs obligatoires
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires (nom, email, mot de passe)",
      });
    }

    // 2. Validation longueur des champs
    if (username.length < 2 || username.length > 50) {
      return res.status(400).json({
        message: "Le nom doit contenir entre 2 et 50 caractères",
      });
    }

    // 3. Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Format d'email invalide",
      });
    }

    // 4. Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        message: "L'email choisi est déjà utilisé, essayez-en un autre",
      });
    }

    // 5. Valider le mot de passe
    if (!verifyPW(password)) {
      return res.status(400).json({
        message:
          "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial (minimum 8 caractères)",
      });
    }

    // 6. Générer le token de vérification
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    // 7. Créer l'utilisateur avec email non vérifié
    const newUser = await User.create({
      nom: username.trim(),
      email: email.toLowerCase().trim(),
      motDePasse: password,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
    });

    // 8. Envoyer l'email de vérification
    const emailSent = await sendVerificationEmail(
      email,
      username,
      verificationToken
    );

    if (!emailSent) {
      return res.status(500).json({
        message: "Erreur lors de l'envoi de l'email de vérification",
      });
    }

    // 9. Réponse de succès
    res.status(201).json({
      message:
        "Compte créé avec succès ! Vérifiez votre email pour activer votre compte.",
      user: {
        id: newUser._id,
        nom: newUser.nom,
        email: newUser.email,
        emailVerified: newUser.emailVerified,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la création du compte",
    });
  }
};

// Fonction pour vérifier l'email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // 1. Validation du token
    if (!token || token.length < 10) {
      return res.status(400).json({
        message: "Token de vérification invalide",
      });
    }

    // 2. Trouver l'utilisateur avec ce token
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }, // Token non expiré
    });

    if (!user) {
      return res.status(400).json({
        message: "Token de vérification invalide ou expiré",
      });
    }

    // 3. Vérifier si l'email n'est pas déjà vérifié
    if (user.emailVerified) {
      return res.status(400).json({
        message: "Ce compte est déjà vérifié",
      });
    }

    // 4. Vérifier l'email et nettoyer les tokens
    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;
    await user.save();

    // 5. Générer le token JWT pour connexion automatique
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Réponse HTML jolie pour le navigateur
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Email vérifié - Progfit</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
          .container { background: white; padding: 40px; border-radius: 10px; max-width: 500px; margin: 0 auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .success { color: #28a745; font-size: 24px; margin-bottom: 20px; }
          .info { color: #666; margin-bottom: 30px; }
          .token { background: #f8f9fa; padding: 15px; border-radius: 5px; word-break: break-all; font-family: monospace; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="success">✅ Email vérifié avec succès !</h1>
          <p class="info">Votre compte <strong>${
            user.email
          }</strong> est maintenant actif.</p>
          <p><strong>Nom :</strong> ${user.nom}</p>
          <p><strong>Niveau :</strong> ${user.niveau}</p>
          <p><strong>Objectifs :</strong> ${user.objectifs.join(", ")}</p>
          <p class="info">Votre token d'authentification :</p>
          <div class="token">${jwtToken}</div>
          <p style="margin-top: 20px; color: #999; font-size: 14px;">
            Vous pouvez fermer cette page et commencer à utiliser Progfit !
          </p>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Erreur lors de la vérification email:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la vérification",
    });
  }
};

// Fonction utilitaire pour nettoyer les tokens expirés
export const cleanExpiredTokens = async () => {
  try {
    const result = await User.updateMany(
      { emailVerificationExpires: { $lt: Date.now() } },
      {
        $unset: {
          emailVerificationToken: 1,
          emailVerificationExpires: 1,
        },
      }
    );
    console.log(`${result.modifiedCount} tokens expirés nettoyés`);
  } catch (error) {
    console.error("Erreur lors du nettoyage des tokens:", error);
  }
};
