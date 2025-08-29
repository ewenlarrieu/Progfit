import User from "../models/User.js";
import jwt from "jsonwebtoken";
import verifyPW from "../utils/verifyPW.js";
import {
  handleEmailVerification,
  generateVerificationSuccessPage,
} from "../utils/email.js";

export const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

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

    // 6. Créer l'utilisateur avec email non vérifié (sans objectifs par défaut)
    const newUser = await User.create({
      nom: username.trim(),
      email: email.toLowerCase().trim(),
      motDePasse: password,
      niveau: "debutant",
      objectifs: [], // Tableau vide, sera rempli lors de updateProfile
    });

    // 7. Gérer la vérification email (génération token + envoi email)
    const emailResult = await handleEmailVerification(newUser);

    if (!emailResult.success) {
      return res.status(500).json({
        message: "Erreur lors de l'envoi de l'email de vérification",
      });
    }

    // 8. Réponse de succès
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
        message: `Objectifs invalides : ${objectifsInvalides.join(
          ", "
        )}. Choisissez parmi : perte de poids, prise de masse, entretien, force`,
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
        profileCompleted: updatedUser.profileCompleted,
        emailVerified: updatedUser.emailVerified,
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
