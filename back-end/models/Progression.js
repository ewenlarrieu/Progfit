import mongoose from "mongoose";

const progressionSchema = new mongoose.Schema(
  {
    utilisateurId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    programmeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Programme",
      required: true,
    },
    seanceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // Référence à l'ID de la séance dans le programme
    },
    dateRealisation: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dureeReelle: {
      type: Number,
      required: true,
      min: 1,
      // Durée en minutes
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    statut: {
      type: String,
      enum: ["terminé", "abandonné"],
      required: true,
      default: "terminé",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Progression", progressionSchema);
