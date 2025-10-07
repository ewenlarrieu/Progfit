import Programme from "../models/Programme.js";
import Exercice from "../models/Exercice.js";
import mongoose from "mongoose";

// Créer un nouveau programme
export const createProgramme = async (req, res) => {
  try {
    const { nom, description, niveau, objectif, duree, seances } = req.body;

    // 1. Validation des champs obligatoires
    if (!nom || !description || !niveau || !objectif || !duree || !seances) {
      return res.status(400).json({
        message:
          "Tous les champs sont obligatoires : nom, description, niveau, objectif, duree, seances",
      });
    }

    // 2. Validation du niveau
    const niveauxValides = ["Débutant", "Intermédiaire", "Avancé"];
    if (!niveauxValides.includes(niveau)) {
      return res.status(400).json({
        message: `Niveau invalide. Valeurs autorisées : ${niveauxValides.join(
          ", "
        )}`,
      });
    }

    // 3. Validation de l'objectif
    const objectifsValides = [
      "Perte de poids",
      "Prise de masse",
      "Entretien",
      "Force",
    ];
    if (!objectifsValides.includes(objectif)) {
      return res.status(400).json({
        message: `Objectif invalide. Valeurs autorisées : ${objectifsValides.join(
          ", "
        )}`,
      });
    }

    // 4. Validation de la durée
    if (!Number.isInteger(duree) || duree < 1 || duree > 52) {
      return res.status(400).json({
        message: "La durée doit être un nombre entier entre 1 et 52 semaines",
      });
    }

    // 5. Validation des séances
    if (!Array.isArray(seances) || seances.length === 0) {
      return res.status(400).json({
        message: "Les séances doivent être un tableau non vide",
      });
    }

    // 6. Validation de chaque séance
    for (let i = 0; i < seances.length; i++) {
      const seance = seances[i];

      if (
        !seance.jour ||
        !seance.nom ||
        !seance.objectif ||
        !seance.dureeEstimee
      ) {
        return res.status(400).json({
          message: `Séance ${
            i + 1
          } : jour, nom, objectif et dureeEstimee sont obligatoires`,
        });
      }

      if (
        !Number.isInteger(seance.jour) ||
        seance.jour < 1 ||
        seance.jour > 7
      ) {
        return res.status(400).json({
          message: `Séance ${i + 1} : le jour doit être un nombre entre 1 et 7`,
        });
      }

      if (
        !Number.isInteger(seance.dureeEstimee) ||
        seance.dureeEstimee < 1 ||
        seance.dureeEstimee > 300
      ) {
        return res.status(400).json({
          message: `Séance ${
            i + 1
          } : la durée estimée doit être entre 1 et 300 minutes`,
        });
      }

      // 7. Validation des exercices (optionnel)
      if (seance.exercices) {
        if (!Array.isArray(seance.exercices)) {
          return res.status(400).json({
            message: `Séance ${i + 1} : les exercices doivent être un tableau`,
          });
        }

        // Vérifier que les IDs d'exercices sont valides
        for (let j = 0; j < seance.exercices.length; j++) {
          const exerciceId = seance.exercices[j];
          if (!mongoose.Types.ObjectId.isValid(exerciceId)) {
            return res.status(400).json({
              message: `Séance ${i + 1}, exercice ${
                j + 1
              } : ID d'exercice invalide`,
            });
          }

          // Vérifier que l'exercice existe
          const exerciceExists = await Exercice.findById(exerciceId);
          if (!exerciceExists) {
            return res.status(400).json({
              message: `Séance ${i + 1}, exercice ${
                j + 1
              } : exercice introuvable avec l'ID ${exerciceId}`,
            });
          }
        }
      }
    }

    // 8. Vérifier que le nom du programme n'existe pas déjà
    const existingProgramme = await Programme.findOne({ nom });
    if (existingProgramme) {
      return res.status(400).json({
        message: `Un programme avec le nom "${nom}" existe déjà`,
      });
    }

    // 9. Créer le programme
    const nouveauProgramme = new Programme({
      nom: nom.trim(),
      description: description.trim(),
      niveau,
      objectif,
      duree,
      seances: seances.map((seance) => ({
        jour: seance.jour,
        nom: seance.nom.trim(),
        objectif: seance.objectif.trim(),
        dureeEstimee: seance.dureeEstimee,
        exercices: seance.exercices || [],
      })),
    });

    const programmeSauvegarde = await nouveauProgramme.save();

    // 10. Réponse de succès
    res.status(201).json({
      message: "Programme créé avec succès !",
      programme: programmeSauvegarde,
      resume: {
        nom: programmeSauvegarde.nom,
        niveau: programmeSauvegarde.niveau,
        objectif: programmeSauvegarde.objectif,
        duree: `${programmeSauvegarde.duree} semaines`,
        nombreSeances: programmeSauvegarde.seances.length,
        dureeTotal:
          programmeSauvegarde.seances.reduce(
            (total, seance) => total + seance.dureeEstimee,
            0
          ) + " minutes par semaine",
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création du programme:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la création du programme",
      error: error.message,
    });
  }
};

// Supprimer un programme par son ID
export const deleteProgrammeById = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validation de l'ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID de programme invalide",
      });
    }

    // 2. Vérifier si le programme existe
    const programme = await Programme.findById(id);
    if (!programme) {
      return res.status(404).json({
        message: "Programme non trouvé",
      });
    }

    // 3. Supprimer le programme
    await Programme.findByIdAndDelete(id);

    // 4. Réponse de succès
    res.status(200).json({
      message: "Programme supprimé avec succès",
      programmeSupprime: {
        id: programme._id,
        nom: programme.nom,
        niveau: programme.niveau,
        objectif: programme.objectif,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du programme:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la suppression du programme",
      error: error.message,
    });
  }
};

// Récupérer tous les programmes
export const getAllProgrammes = async (req, res) => {
  try {
    const programmes = await Programme.find().sort({ nom: 1 });

    res.status(200).json({
      message: "Programmes récupérés avec succès",
      count: programmes.length,
      programmes,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des programmes:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des programmes",
    });
  }
};

// Récupérer programmes par niveau
export const getProgrammesByLevel = async (req, res) => {
  try {
    const { niveau } = req.params;

    // Valider que le niveau est autorisé
    const niveauxAutorises = ["Débutant", "Intermédiaire", "Avancé"];
    if (!niveauxAutorises.includes(niveau)) {
      return res.status(400).json({
        message: `Niveau invalide. Les niveaux autorisés sont: ${niveauxAutorises.join(
          ", "
        )}`,
      });
    }

    const programmes = await Programme.find({ niveau }).sort({ nom: 1 });

    res.status(200).json({
      message: `Programmes de niveau ${niveau} récupérés avec succès`,
      count: programmes.length,
      programmes,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des programmes par niveau:",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des programmes",
    });
  }
};

// Récupérer un programme avec ses exercices détaillés
export const getProgrammeDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const programme = await Programme.findById(id).populate(
      "seances.exercices"
    );

    if (!programme) {
      return res.status(404).json({
        message: "Programme non trouvé",
      });
    }

    res.status(200).json({
      message: "Détails du programme récupérés avec succès",
      programme,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du programme:",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des détails",
    });
  }
};

// Assigner des exercices aux programmes selon leur niveau et objectif
export const assignExercisesToProgrammes = async (req, res) => {
  try {
    console.log("🔧 Assignation des exercices aux programmes...");

    // Récupérer tous les programmes et exercices
    const programmes = await Programme.find();
    const exercices = await Exercice.find();

    // Définir les exercices par type de programme
    const exercicesParNiveau = {
      Débutant: exercices.filter((ex) => ex.niveau === "Débutant"),
      Intermédiaire: exercices.filter((ex) => ex.niveau === "Intermédiaire"),
      Avancé: exercices.filter((ex) => ex.niveau === "Avancé"),
    };

    // Exercices spécifiques par objectif
    const exercicesParObjectif = {
      Entretien: [
        "Pompes",
        "Squats",
        "Planche",
        "Étirements des bras",
        "Marche sur place",
        "Étirements des jambes",
        "Rotation du tronc",
      ],
      "Perte de poids": [
        "Burpees",
        "Mountain Climbers",
        "Jumping Jacks",
        "Squats sautés",
        "Pompes",
        "Planche",
      ],
      "Prise de masse": [
        "Pompes",
        "Squats",
        "Tractions",
        "Dips",
        "Pike push-ups",
        "Fentes",
      ],
      Force: [
        "Pompes diamant",
        "Squats isométriques",
        "Planche avancée",
        "Tractions",
        "Handstand push-ups assistés",
      ],
    };

    let programmesModifies = 0;

    for (const programme of programmes) {
      console.log(
        `\n🎯 Traitement programme: ${programme.nom} (${programme.niveau} - ${programme.objectif})`
      );

      // Sélectionner les exercices appropriés
      const exercicesDisponibles =
        exercicesParNiveau[programme.niveau] || exercices;
      const exercicesObjectif = exercicesParObjectif[programme.objectif] || [];

      // Filtrer les exercices par nom pour cet objectif
      const exercicesSelectionnes = exercicesDisponibles.filter((ex) =>
        exercicesObjectif.includes(ex.nom)
      );

      // Si pas assez d'exercices spécifiques, ajouter d'autres exercices du niveau
      if (exercicesSelectionnes.length < 6) {
        const exercicesSupplementaires = exercicesDisponibles
          .filter(
            (ex) => !exercicesSelectionnes.some((sel) => sel._id.equals(ex._id))
          )
          .slice(0, 6 - exercicesSelectionnes.length);
        exercicesSelectionnes.push(...exercicesSupplementaires);
      }

      // Assigner les exercices aux séances
      programme.seances.forEach((seance, index) => {
        // Assigner exercices par séance selon le niveau
        const nombreExercices =
          programme.niveau === "Débutant"
            ? 3
            : programme.niveau === "Intermédiaire"
            ? 4
            : 5;

        // Mélanger et sélectionner des exercices
        const exercicesSeance = exercicesSelectionnes
          .sort(() => 0.5 - Math.random())
          .slice(0, nombreExercices)
          .map((ex) => ex._id);

        seance.exercices = exercicesSeance;
      });

      await programme.save();
      programmesModifies++;
    }

    res.status(200).json({
      message: `${programmesModifies} programmes mis à jour avec des exercices`,
      programmesModifies,
      totalExercices: exercices.length,
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'assignation:", error);
    res.status(500).json({
      message: "Erreur serveur lors de l'assignation des exercices",
      error: error.message,
    });
  }
};
