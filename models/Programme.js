import mongoose from "mongoose";

const programmeSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    niveau: {
      type: String,
      enum: ["Débutant", "Intermédiaire", "Avancé"],
      required: true,
    },
    objectif: {
      type: String,
      enum: ["Perte de poids", "Prise de masse", "Entretien", "Force"],
      required: true,
    },
    duree: {
      type: Number,
      required: true,
      min: 1,
      // Durée en semaines
    },
    seances: [
      {
        jour: {
          type: Number,
          required: true,
          min: 1,
        },
        nom: {
          type: String,
          required: true,
        },
        objectif: {
          type: String,
          required: true,
        },
        dureeEstimee: {
          type: Number,
          required: true,
          min: 1,
          // Durée en minutes
        },
        exercices: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exercice",
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Programme", programmeSchema);
