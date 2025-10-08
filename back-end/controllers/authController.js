import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import verifyPW from "../utils/verifyPW.js";
import {
  handleEmailVerification,
  generateVerificationSuccessPage,
  handlePasswordResetEmail,
} from "../utils/email.js";

export const register = async (req, res) => {
  const { username, email, password, confirmPassword, niveau, objectifs } =
    req.body;

  try {
    // 1. Validation des champs obligatoires
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message:
          "Tous les champs sont obligatoires (nom, email, mot de passe, confirmation du mot de passe)",
      });
    }

    // 2. Vérification que les mots de passe correspondent
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Les mots de passe ne correspondent pas",
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

    // 6. Validation du niveau et des objectifs
    const niveauxValides = ["debutant", "intermediaire", "avance"];
    const objectifsValides = [
      "perte de poids",
      "prise de masse",
      "entretien",
      "force",
    ];

    const niveauFinal =
      niveau && niveauxValides.includes(niveau) ? niveau : "debutant";
    const objectifsFinal = Array.isArray(objectifs)
      ? objectifs.filter((obj) => objectifsValides.includes(obj))
      : [];

    // 7. Créer l'utilisateur avec email non vérifié
    const newUser = await User.create({
      nom: username.trim(),
      email: email.toLowerCase().trim(),
      motDePasse: password,
      niveau: niveauFinal,
      objectifs: objectifsFinal,
      profileCompleted: objectifsFinal.length > 0,
    });

    // 8. Gérer la vérification email (génération token + envoi email)
    console.log(`📧 Tentative d'envoi d'email de vérification pour ${newUser.email}...`);
    const emailResult = await handleEmailVerification(newUser);

    if (!emailResult.success) {
      console.error(`❌ Échec de l'envoi d'email pour ${newUser.email}`);
      return res.status(500).json({
        message: "Erreur lors de l'envoi de l'email de vérification. Vérifiez la configuration email du serveur.",
      });
    }

    console.log(`✅ Email de vérification envoyé avec succès pour ${newUser.email}`);
    
    // 9. Réponse de succès
    res.status(201).json({
      message:
        "Compte créé avec succès ! Vérifiez votre email pour activer votre compte.",
      user: {
        id: newUser._id,
        nom: newUser.nom,
        email: newUser.email,
        niveau: newUser.niveau,
        objectifs: newUser.objectifs,
        emailVerified: newUser.emailVerified,
        profileCompleted: newUser.profileCompleted,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la création du compte",
    });
  }
};

// Fonction de connexion
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Validation des champs obligatoires
    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe sont obligatoires",
      });
    }

    // 2. Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Format d'email invalide",
      });
    }

    // 3. Trouver l'utilisateur par email
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    // 4. Vérifier le mot de passe
    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    // 5. Vérifier si l'email est vérifié
    if (!user.emailVerified) {
      return res.status(403).json({
        message:
          "Veuillez vérifier votre email avant de vous connecter. Vérifiez votre boîte de réception.",
        emailVerified: false,
      });
    }

    // 6. Générer le token JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 7. Réponse de succès avec les données utilisateur
    res.status(200).json({
      message: "Connexion réussie !",
      token,
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        niveau: user.niveau,
        objectifs: user.objectifs,
        profileCompleted: user.profileCompleted,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la connexion",
    });
  }
};

// Fonction pour demander la réinitialisation du mot de passe
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // 1. Validation de l'email
    if (!email) {
      return res.status(400).json({
        message: "L'email est obligatoire",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Format d'email invalide",
      });
    }

    // 2. Trouver l'utilisateur
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(200).json({
        message:
          "Si cet email existe, un lien de réinitialisation a été envoyé.",
      });
    }

    // 3. Vérifier que l'email est vérifié
    if (!user.emailVerified) {
      return res.status(400).json({
        message:
          "Veuillez d'abord vérifier votre email avant de réinitialiser votre mot de passe.",
      });
    }

    // 4. Générer le token de réinitialisation
    const resetToken = crypto.randomBytes(32).toString("hex");

    // 5. Le token expire dans 30 minutes
    const resetExpires = new Date();
    resetExpires.setMinutes(resetExpires.getMinutes() + 30);

    // 5. Sauvegarder le token dans la base
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetExpires;
    await user.save();

    // 6. Envoyer l'email de réinitialisation
    const resetResult = await handlePasswordResetEmail(user, resetToken);

    if (!resetResult.success) {
      return res.status(500).json({
        message: "Erreur lors de l'envoi de l'email de réinitialisation",
      });
    }

    // 7. Réponse de succès
    res.status(200).json({
      message: "Un email de réinitialisation a été envoyé à votre adresse.",
    });
  } catch (error) {
    console.error("Erreur lors de la demande de réinitialisation:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la demande de réinitialisation",
    });
  }
};

// Fonction pour réinitialiser le mot de passe avec le token
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    // 1. Validation des champs
    if (!password || !confirmPassword) {
      return res.status(400).json({
        message: "Le mot de passe et sa confirmation sont obligatoires",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Les mots de passe ne correspondent pas",
      });
    }

    // 2. Valider le mot de passe
    if (!verifyPW(password)) {
      return res.status(400).json({
        message:
          "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial (minimum 8 caractères)",
      });
    }

    // 3. Trouver l'utilisateur avec le token
    const user = await User.findOne({ passwordResetToken: token });

    // 4. Vérifier si le token existe et n'est pas expiré
    if (!user || user.passwordResetExpires < Date.now()) {
      return res.status(400).json({
        message: "Token de réinitialisation invalide ou expiré",
      });
    }

    // 5. Mettre à jour le mot de passe et nettoyer les tokens
    user.motDePasse = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    // 5. Générer un nouveau token JWT pour connexion automatique
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6. Réponse de succès
    res.status(200).json({
      message: "Mot de passe réinitialisé avec succès !",
      token: jwtToken,
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        niveau: user.niveau,
        objectifs: user.objectifs,
        profileCompleted: user.profileCompleted,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la réinitialisation:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la réinitialisation du mot de passe",
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

    // 6. Envoyer la page HTML de confirmation
    const htmlPage = generateVerificationSuccessPage(user, jwtToken);
    res.status(200).send(htmlPage);
  } catch (error) {
    console.error("Erreur lors de la vérification email:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la vérification",
    });
  }
};

// Fonction pour mettre à jour le profil utilisateur (niveau et objectifs)
export const updateProfile = async (req, res) => {
  const { niveau, objectifs } = req.body;

  try {
    // 1. Récupérer l'utilisateur depuis le token JWT
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "Token d'authentification requis",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // 2. Validation des champs
    const niveauxValides = ["debutant", "intermediaire", "avance"];
    const objectifsValides = [
      "perte de poids",
      "prise de masse",
      "entretien",
      "force",
    ];

    if (!niveau || !niveauxValides.includes(niveau.toLowerCase())) {
      return res.status(400).json({
        message:
          "Niveau invalide. Choisissez parmi : débutant, intermédiaire, avancé",
      });
    }

    if (!objectifs || !Array.isArray(objectifs) || objectifs.length === 0) {
      return res.status(400).json({
        message: "Veuillez sélectionner au moins un objectif",
      });
    }

    // Vérifier que tous les objectifs sont valides
    const objectifsInvalides = objectifs.filter(
      (obj) => !objectifsValides.includes(obj.toLowerCase())
    );

    if (objectifsInvalides.length > 0) {
      return res.status(400).json({
        message: `Objectifs invalides : Choisissez parmi : perte de poids, prise de masse, entretien, force`,
      });
    }

    // 3. Mettre à jour l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        niveau: niveau.toLowerCase(),
        objectifs: objectifs.map((obj) => obj.toLowerCase()),
        profileCompleted: true,
      },
      {
        new: true,
        select: "-motDePasse -emailVerificationToken -emailVerificationExpires",
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    // 4. Réponse de succès
    res.status(200).json({
      message: "Profil mis à jour avec succès !",
      user: {
        id: updatedUser._id,
        nom: updatedUser.nom,
        email: updatedUser.email,
        niveau: updatedUser.niveau,
        objectifs: updatedUser.objectifs,
      },
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Token d'authentification invalide",
      });
    }

    console.error("Erreur lors de la mise à jour du profil:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour du profil",
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

// Fonction utilitaire pour nettoyer les objectifs par défaut des utilisateurs existants
export const resetDefaultObjectives = async () => {
  try {
    // Réinitialiser les objectifs de tous les utilisateurs qui n'ont pas complété leur profil
    const result = await User.updateMany(
      {
        profileCompleted: { $ne: true },
        objectifs: { $in: ["entretien"] },
      },
      {
        $set: {
          objectifs: [],
        },
      }
    );
    console.log(
      `${result.modifiedCount} utilisateurs avec objectifs par défaut nettoyés`
    );
    return result.modifiedCount;
  } catch (error) {
    console.error("Erreur lors du nettoyage des objectifs par défaut:", error);
    return 0;
  }
};

// Récupérer le profil de l'utilisateur
export const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token d'authentification requis",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId).select(
      "-password -refreshToken -emailVerificationToken -passwordResetToken -passwordResetExpiry"
    );

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        niveau: user.niveau,
        objectifs: user.objectifs,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération du profil",
    });
  }
};
