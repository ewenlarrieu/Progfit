import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import exerciceRoutes from "./routes/exerciceRoutes.js";
import programmeRoutes from "./routes/programmeRoutes.js";

import userProgrammeRoutes from "./routes/userProgrammeRoutes.js";

dotenv.config();

const app = express();

// Configuration CORS sécurisée
const corsOptions = {
  origin: function (origin, callback) {
    // Liste des domaines autorisés
    const allowedOrigins = [
      "http://localhost:3000", // React dev server
      "http://localhost:5173", // Vite dev server
      "http://localhost:5174", // Vite dev server (port alternatif)
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "https://ewenlarrieu.github.io", // GitHub Pages
      "https://progfit.onrender.com", // URL du backend Render (pour les tests)
    ];

    // Autoriser les requêtes sans origin (ex: applications mobiles, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Accès refusé par la politique CORS"));
    }
  },
  credentials: true, // Permet l'envoi de cookies et headers d'authentification
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/exercices", exerciceRoutes);
app.use("/api/programmes", programmeRoutes);

app.use("/api/user-programmes", userProgrammeRoutes);

// Connexion MongoDB avec timeout plus long
mongoose
  .connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 30000,
    bufferCommands: false,
    maxPoolSize: 10,
    minPoolSize: 5,
  })
  .then(() => {
    console.log("Connexion à MongoDB réussi ");
  })
  .catch((err) => {
    console.error("Erreur connexion MongoDB:", err);
    process.exit(1);
  });

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT} `);
});
