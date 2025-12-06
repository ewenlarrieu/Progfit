import Programme from "../models/Programme.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

//Subscribe to programme
export const subscribeToProgramme = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication token required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { programmeId } = req.params;

    const existingUser = await User.findById(userId);
    if (
      existingUser.programmeActuel &&
      existingUser.programmeActuel.programmeId
    ) {
      return res.status(400).json({
        message:
          "You are already subscribed to a programme. Please unsubscribe first.",
      });
    }

    const programme = await Programme.findById(programmeId);
    if (!programme) {
      return res.status(401).json({
        message: "Programme not found",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        "programmeActuel.programmeId": programmeId,
        "programmeActuel.dateDebut": new Date(),
        "programmeActuel.semaineActuelle": 1,
        "programmeActuel.seancesCompletees": [],
        "programmeActuel.statut": "actif",
      },
      { new: true }
    );
    res.status(200).json({
      message: "Successfully subscrided to programme",
      user: {
        id: user._id,
        nom: user.nom,
        programmeActuel: user.programmeActuel,
      },
    });
  } catch (error) {
    console.error("Error subscribing to programme:", error);
    res.status(500).json({
      message: "Server error while subscribing to programme",
    });
  }
};

//Unsubscribe to programme
export const unsubscribeFromProgramme = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication token required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.programmeActuel || !user.programmeActuel.programmeId) {
      return res.status(400).json({
        message: "No active programme to unsubscribe from",
      });
    }

    user.historiquePrograms.push({
      programmeId: user.programmeActuel.programmeId,
      dateDebut: user.programmeActuel.dateDebut,
      dateFin: new Date(),
      statut: "abandonne",
    });
    user.programmeActuel = undefined;

    await user.save();

    res.status(200).json({
      message: "Successfully unsubscribed from programme",
      user: {
        id: user._id,
        nom: user.nom,
        programmeActuel: user.programmeActuel,
      },
    });
  } catch (error) {
    console.error("Error unsubscribing from programme:", error);
    res.status(500).json({
      message: "Server error while unsubscribing from programme",
    });
  }
};

// Mark a seance as completed
export const markSeanceAsCompleted = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication token required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { jour } = req.body;

    if (!jour) {
      return res.status(400).json({
        message: "Day is required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.programmeActuel || !user.programmeActuel.programmeId) {
      return res.status(400).json({
        message: "No active programme",
      });
    }

    const programme = await Programme.findById(
      user.programmeActuel.programmeId
    );
    if (!programme) {
      return res.status(404).json({
        message: "Programme not found",
      });
    }

    const seanceExists = programme.seances.some((s) => s.jour === jour);
    if (!seanceExists) {
      return res.status(400).json({
        message: "This day does not exist in the programme",
      });
    }

    if (user.programmeActuel.seancesCompletees.includes(jour)) {
      return res.status(400).json({
        message: "This seance is already completed",
      });
    }

    user.programmeActuel.seancesCompletees.push(jour);

    user.totalSeancesCompletees = (user.totalSeancesCompletees || 0) + 1;

    await user.save();

    // Check if all seances are now completed
    const allJours = programme.seances.map((s) => s.jour);
    const allCompleted = allJours.every((j) =>
      user.programmeActuel.seancesCompletees.includes(j)
    );

    res.status(200).json({
      message: allCompleted
        ? "Seance marked as completed! All seances completed, you can now validate the week"
        : "Seance marked as completed",
      weekComplete: allCompleted,
      user: {
        id: user._id,
        nom: user.nom,
        programmeActuel: user.programmeActuel,
      },
    });
  } catch (error) {
    console.error("Error marking seance as completed:", error);
    res.status(500).json({
      message: "Server error while marking seance as completed",
    });
  }
};

// Validate and move to next week
export const validateWeek = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication token required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.programmeActuel || !user.programmeActuel.programmeId) {
      return res.status(400).json({
        message: "No active programme",
      });
    }

    // Check if programme is already completed
    if (user.programmeActuel.statut === "termine") {
      return res.status(400).json({
        message: "This programme is already completed",
      });
    }

    const programme = await Programme.findById(
      user.programmeActuel.programmeId
    );
    if (!programme) {
      return res.status(404).json({
        message: "Programme not found",
      });
    }

    const allJours = programme.seances.map((s) => s.jour);
    const allCompleted = allJours.every((j) =>
      user.programmeActuel.seancesCompletees.includes(j)
    );

    if (!allCompleted) {
      return res.status(400).json({
        message: "All seances must be completed before validating the week",
        completed: user.programmeActuel.seancesCompletees.length,
        total: allJours.length,
      });
    }

    // Move to next week
    user.programmeActuel.semaineActuelle += 1;
    user.programmeActuel.seancesCompletees = [];

    if (user.programmeActuel.semaineActuelle > programme.duree) {
      // Add to history before clearing
      user.historiquePrograms.push({
        programmeId: user.programmeActuel.programmeId,
        dateDebut: user.programmeActuel.dateDebut,
        dateFin: new Date(),
        statut: "termine",
      });
      user.programmeActuel = undefined;

      await user.save();

      return res.status(200).json({
        message: "Programme completed! Congratulations!",
        programmeCompleted: true,
        user: {
          id: user._id,
          nom: user.nom,
          programmeActuel: user.programmeActuel,
        },
      });
    }

    await user.save();

    res.status(200).json({
      message: `Week ${
        user.programmeActuel.semaineActuelle - 1
      } validated! Moving to week ${user.programmeActuel.semaineActuelle}`,
      user: {
        id: user._id,
        nom: user.nom,
        programmeActuel: user.programmeActuel,
      },
    });
  } catch (error) {
    console.error("Error validating week:", error);
    res.status(500).json({
      message: "Server error while validating week",
    });
  }
};

//Get history programmes
export const getHistoriqueProgrammes = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentification token required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId).populate(
      "historiquePrograms.programmeId"
    );

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "History programs :",
      histoique: user.historiquePrograms,
    });
  } catch (error) {
    console.error("Error getting history:", error);
    res.status(500).json({
      message: "Server error while getting history",
    });
  }
};

//Get curent programme
export const getCurrentProgramme = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication token required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId).populate(
      "programmeActuel.programmeId"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.programmeActuel || !user.programmeActuel.programmeId) {
      return res.status(200).json({
        message: "No active programme",
        programmeActuel: null,
      });
    }

    res.status(200).json({
      message: "Current programme retrieved successfully",
      programmeActuel: {
        programme: user.programmeActuel.programmeId,
        dateDebut: user.programmeActuel.dateDebut,
        semaineActuelle: user.programmeActuel.semaineActuelle,
        seancesCompletees: user.programmeActuel.seancesCompletees,
        statut: user.programmeActuel.statut,
      },
    });
  } catch (error) {
    console.error("Error getting current programme:", error);
    res.status(500).json({
      message: "Server error while getting current programme",
    });
  }
};
