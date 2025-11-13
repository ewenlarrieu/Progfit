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
      progression: {
        type: Number,
        default: 0,
      },
      statut: {
        type: String,
        enum: ["actif", "termine", "pause"],
        default: "actif",
      },
      seancesTerminees: [
        {
          seanceIndex: {
            type: Number,
            required: true,
          },
          dateTerminee: {
            type: Date,
            default: Date.now,
          },
          exercicesTermines: [
            {
              exerciceId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exercice",
              },
              series: {
                type: Number,
                default: 0,
              },
              repetitions: {
                type: Number,
                default: 0,
              },
              duree: {
                type: Number,
                default: 0,
              }, // en secondes
              notes: {
                type: String,
                default: "",
              },
            },
          ],
        },
      ],
    },
    historiquePrograms: [
      {
        programmeId: { type: mongoose.Schema.Types.ObjectId, ref: "Programme" },
        dateDebut: { type: Date },
        dateFin: { type: Date },
        progression: { type: Number, default: 0 },
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
