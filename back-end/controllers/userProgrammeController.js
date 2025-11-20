import Programme from "../models/Programme";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const subscribeToProgramme = async (req, res) => {
  try {
    const token = req.header.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication token required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { programmeId } = req.params;

    const programme = await Programme.findById(programmeId);
    if (!programme) {
      return res.status(401).json({
        message: "Programme not found",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        "programmeActuel.programmId": programmeId,
        "programmeActuel.dateDebut": new Date(),
        "programmeActuel.progression": 0,
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
