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
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: null,
    },
    emailVerificationExpires: {
      type: Date,
      default: null,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetExpires: {
      type: Date,
      default: null,
    },
    niveau: {
      type: String,
      enum: ["debutant", "intermediaire", "avance"],
      default: "debutant",
    },
    objectifs: {
      type: [String],
      enum: ["perte de poids", "prise de masse", "entretien", "force"],
      default: [],
    },
    profileCompleted: {
      type: Boolean,
      default: false,
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
          }, // Index de la séance dans le programme (0, 1, 2...)
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
