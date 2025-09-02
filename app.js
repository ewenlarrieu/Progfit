import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import exerciceRoutes from "./routes/exerciceRoutes.js";
import programmeRoutes from "./routes/programmeRoutes.js";
import seanceRoutes from "./routes/seanceRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/exercices", exerciceRoutes);
app.use("/api/programmes", programmeRoutes);
app.use("/api/seances", seanceRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connexion à MongoDB réussi ✅");
    app.listen(PORT, () =>
      console.log(`Le serveur tourne sur le port ${PORT}🌐`)
    );
  })
  .catch((err) => console.log(err));
