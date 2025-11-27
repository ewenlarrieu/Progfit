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
          "All fields are required (username, email, password, password confirmation)",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }
    if (username.length < 2 || username.length > 50) {
      return res.status(400).json({
        message: "Username must be between 2 and 50 characters",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        message: "This email is already in use",
      });
    }
    if (!verifyPW(password)) {
      return res.status(400).json({
        message:
          "Password must contain an uppercase letter, a lowercase letter, a number and a special character (minimum 8 characters)",
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
        message: "Please choose a valid level: debutant, intermediaire, avance",
      });
    }

    if (!objectif || !validGoals.includes(objectif.toLowerCase())) {
      return res.status(400).json({
        message:
          "Please select a valid goal: perte de poids, prise de masse, entretien, force",
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
      message: "Account created successfully!",
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
      message: "Server error during account creation",
    });
  }
};

//Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Incorrect email or password",
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
      message: "Login successful!",
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
      message: "Server error during login",
    });
  }
};

//Update profile
export const updateProfile = async (req, res) => {
  const { username, niveau, objectif } = req.body;

  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "Authentication token required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

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
          message: "Username must be between 2 and 50 characters",
        });
      }
      updateData.nom = username.trim();
    }

    if (niveau) {
      if (!validLevels.includes(niveau.toLowerCase())) {
        return res.status(400).json({
          message:
            "Please choose a valid level: debutant, intermediaire, avance",
        });
      }
      updateData.niveau = niveau.toLowerCase();
    }

    if (objectif) {
      if (!validGoals.includes(objectif.toLowerCase())) {
        return res.status(400).json({
          message:
            "Please select a valid goal: perte de poids, prise de masse, entretien, force",
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
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully!",
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
      message: "Server error while updating profile",
    });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication token required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId)
      .select("-motDePasse")
      .populate("programmeActuel.programmeId");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
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
      message: "Server error while retrieving profile",
    });
  }
};

// Delete user account
export const deleteAccount = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication token required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({
      message: "Server error while deleting account",
    });
  }
};
