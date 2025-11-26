import Programme from "../models/Programme.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

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

    // Check if user already has an active programme
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

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $unset: { programmeActuel: "" },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Successfully unsubscribed from programme",
      user: {
        id: updatedUser._id,
        nom: updatedUser.nom,
        programmeActuel: updatedUser.programmeActuel,
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

    // Get the programme to check available seances
    const programme = await Programme.findById(
      user.programmeActuel.programmeId
    );
    if (!programme) {
      return res.status(404).json({
        message: "Programme not found",
      });
    }

    // Check if the jour exists in the programme
    const seanceExists = programme.seances.some((s) => s.jour === jour);
    if (!seanceExists) {
      return res.status(400).json({
        message: "This jour does not exist in the programme",
      });
    }

    // Check if already completed
    if (user.programmeActuel.seancesCompletees.includes(jour)) {
      return res.status(400).json({
        message: "This seance is already completed",
      });
    }

    // Add jour to completed seances
    user.programmeActuel.seancesCompletees.push(jour);

    // Increment total seances completed
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

    // Check if all seances are completed
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

    // Check if programme is completed
    if (user.programmeActuel.semaineActuelle > programme.duree) {
      // Add to history before clearing
      user.historiquePrograms.push({
        programmeId: user.programmeActuel.programmeId,
        dateDebut: user.programmeActuel.dateDebut,
        dateFin: new Date(),
        statut: "termine",
      });

      // Clear programmeActuel
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

export const cancelLastSeance = async (req, res) => {
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

    if (user.programmeActuel.seancesCompletees.length === 0) {
      return res.status(400).json({
        message: "No completed seances to cancel",
      });
    }

    // Remove last completed seance
    const cancelledJour = user.programmeActuel.seancesCompletees.pop();

    await user.save();

    res.status(200).json({
      message: `Seance ${cancelledJour} cancelled successfully`,
      cancelledJour,
      user: {
        id: user._id,
        nom: user.nom,
        programmeActuel: user.programmeActuel,
      },
    });
  } catch (error) {
    console.error("Error cancelling seance:", error);
    res.status(500).json({
      message: "Server error while cancelling seance",
    });
  }
};

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
