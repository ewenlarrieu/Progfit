import mongoose from "mongoose";

const exerciceSchema = new mongoose.Schema(
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
    groupesMusculaires: [
      {
        type: String,
        enum: [
          "Pectoraux",
          "Dorsaux",
          "Épaules",
          "Biceps",
          "Triceps",
          "Abdominaux",
          "Quadriceps",
          "Ischio-jambiers",
          "Mollets",
          "Fessiers",
          "Corps entier",
        ],
      },
    ],
    instructions: [
      {
        type: String,
        required: true,
      },
    ],
    series: {
      type: Number,
      required: true,
      min: 1,
    },
    repetitions: {
      type: String,
      required: true,
    },
    duree: {
      type: Number,
      // Durée en secondes (pour exercices temporisés)
      min: 0,
    },
    niveau: {
      type: String,
      enum: ["Débutant", "Intermédiaire", "Avancé"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Exercice", exerciceSchema);
