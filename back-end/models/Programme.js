import mongoose from "mongoose";

const programmeSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulte: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    objectif: {
      type: String,
      enum: ["perte de poids", "prise de masse", "entretien", "force"],
      required: true,
    },
    duree: {
      type: Number,
      required: true,
    },
    seances: [
      {
        jour: {
          type: Number,
          required: true,
        },
        nom: {
          type: String,
          required: true,
        },
        dureeEstimee: {
          type: Number,
          required: true,
        },
        exercices: [
          {
            nom: {
              type: String,
              required: true,
            },
            description: {
              type: String,
              required: true,
            },
            series: {
              type: Number,
              required: true,
            },
            repetitions: {
              type: String,
              required: true,
            },
            repos: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Programme", programmeSchema);
