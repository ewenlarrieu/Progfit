import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    motDePasse: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    niveau: {
      type: String,
      enum: ["debutant", "intermediaire", "avance"],
      default: "debutant",
    },
    objectif: {
      type: String,
      enum: ["perte de poids", "prise de masse", "entretien", "force"],
      required: true,
    },
    programmeActuel: {
      programmeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Programme",
        default: null,
      },
      dateDebut: {
        type: Date,
        default: null,
      },
      semaineActuelle: {
        type: Number,
        default: 1,
      },
      seancesCompletees: {
        type: [Number],
        default: [],
      },
      statut: {
        type: String,
        enum: ["actif", "termine", "pause"],
        default: "actif",
      },
    },
    historiquePrograms: [
      {
        programmeId: { type: mongoose.Schema.Types.ObjectId, ref: "Programme" },
        dateDebut: { type: Date },
        dateFin: { type: Date },
        statut: {
          type: String,
          enum: ["termine", "abandonne"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("motDePasse")) return next();
  const salt = await bcrypt.genSalt(10);
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.motDePasse);
};

export default mongoose.model("User", userSchema);
