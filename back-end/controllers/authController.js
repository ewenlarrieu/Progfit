import User from "../models/User.js";
import jwt from "jsonwebtoken";
import verifyPW from "../utils/verifyPW.js";

//Register
export const register = async (req, res) => {
  const { username, email, password, confirmPassword, niveau, objectif } =
    req.body;

  try {
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message:
          "Tous les champs sont requis (nom d'utilisateur, email, mot de passe, confirmation du mot de passe)",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Les mots de passe ne correspondent pas",
      });
    }
    if (username.length < 2 || username.length > 50) {
      return res.status(400).json({
        message: "Le nom d'utilisateur doit contenir entre 2 et 50 caractères",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Format d'email invalide",
      });
    }
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        message: "Cet email est déjà utilisé",
      });
    }
    if (!verifyPW(password)) {
      return res.status(400).json({
        message:
          "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial (minimum 8 caractères)",
      });
    }

    const validLevels = ["debutant", "intermediaire", "avance"];
    const validGoals = [
      "perte de poids",
      "prise de masse",
      "entretien",
      "force",
    ];

    if (!niveau || !validLevels.includes(niveau.toLowerCase())) {
      return res.status(400).json({
        message:
          "Veuillez choisir un niveau valide : debutant, intermediaire, avance",
      });
    }

    if (!objectif || !validGoals.includes(objectif.toLowerCase())) {
      return res.status(400).json({
        message:
          "Veuillez sélectionner un objectif valide : perte de poids, prise de masse, entretien, force",
      });
    }

    const newUser = await User.create({
      nom: username.trim(),
      email: email.toLowerCase().trim(),
      motDePasse: password,
      niveau: niveau.toLowerCase(),
      objectif: objectif.toLowerCase(),
    });

    res.status(201).json({
      message: "Compte créé avec succès !",
      user: {
        id: newUser._id,
        nom: newUser.nom,
        email: newUser.email,
        niveau: newUser.niveau,
        objectif: newUser.objectif,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la création du compte",
    });
  }
};

//Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "L'email et le mot de passe sont requis",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Format d'email invalide",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      message: "Connexion réussie !",
      token,
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        niveau: user.niveau,
        objectif: user.objectif,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la connexion",
    });
  }
};

//Update profile
export const updateProfile = async (req, res) => {
  const { username, niveau, objectif } = req.body;

  try {
    const userId = req.user._id;

    const validLevels = ["debutant", "intermediaire", "avance"];
    const validGoals = [
      "perte de poids",
      "prise de masse",
      "entretien",
      "force",
    ];

    const updateData = {};

    if (username) {
      if (username.length < 2 || username.length > 50) {
        return res.status(400).json({
          message:
            "Le nom d'utilisateur doit contenir entre 2 et 50 caractères",
        });
      }
      updateData.nom = username.trim();
    }

    if (niveau) {
      if (!validLevels.includes(niveau.toLowerCase())) {
        return res.status(400).json({
          message:
            "Veuillez choisir un niveau valide : debutant, intermediaire, avance",
        });
      }
      updateData.niveau = niveau.toLowerCase();
    }

    if (objectif) {
      if (!validGoals.includes(objectif.toLowerCase())) {
        return res.status(400).json({
          message:
            "Veuillez sélectionner un objectif valide : perte de poids, prise de masse, entretien, force",
        });
      }
      updateData.objectif = objectif.toLowerCase();
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      select: "-motDePasse",
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    res.status(200).json({
      message: "Profil mis à jour avec succès !",
      user: {
        id: updatedUser._id,
        nom: updatedUser.nom,
        email: updatedUser.email,
        niveau: updatedUser.niveau,
        objectif: updatedUser.objectif,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour du profil",
    });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .select("-motDePasse")
      .populate("programmeActuel.programmeId");

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
        role: user.role,
        niveau: user.niveau,
        objectif: user.objectif,
        createdAt: user.createdAt,
        totalSeancesCompletees: user.totalSeancesCompletees,
        programmeActuel: user.programmeActuel?.programmeId
          ? {
              programme: user.programmeActuel.programmeId,
              dateDebut: user.programmeActuel.dateDebut,
              semaineActuelle: user.programmeActuel.semaineActuelle,
              seancesCompletees: user.programmeActuel.seancesCompletees,
              statut: user.programmeActuel.statut,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Error retrieving profile:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération du profil",
    });
  }
};

// Delete user account
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    res.status(200).json({
      message: "Compte supprimé avec succès",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la suppression du compte",
    });
  }
};
