import Programme from "../models/Programme.js";
import Exercice from "../models/Exercice.js";

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

// Ajouter le programme Prise de masse Intermédiaire
export const addMassGainIntermediateProgram = async (req, res) => {
  try {
    // Vérifier si le programme existe déjà
    const existingProgram = await Programme.findOne({
      nom: "Prise de masse - Intermédiaire",
    });
    if (existingProgram) {
      return res.status(400).json({
        message: "Le programme Prise de masse Intermédiaire existe déjà",
      });
    }

    // Récupérer les exercices nécessaires pour la prise de masse intermédiaire
    const exercices = await Exercice.find({
      nom: {
        $in: [
          "Pompes archer",
          "Squats bulgares",
          "Dips triceps avancés",
          "Pike push-ups avancés",
          "Squats pistolet assistés",
          "Tractions négatives",
          "Pompes diamant",
          "Planche",
          "Superman",
          "Dips",
          "Tractions",
          "Squats isométriques",
        ],
      },
    });

    if (exercices.length < 10) {
      return res.status(400).json({
        message:
          "Tous les exercices requis ne sont pas disponibles. Ajoutez d'abord les exercices de base.",
      });
    }

    // Créer le programme Prise de masse Intermédiaire
    const massGainProgram = {
      nom: "Prise de masse - Intermédiaire",
      description:
        "Programme intense 5 fois par semaine avec exercices avancés pour maximiser l'hypertrophie musculaire",
      niveau: "Intermédiaire",
      objectif: "Prise de masse",
      duree: 8, // 8 semaines
      seances: [
        {
          jour: 1,
          nom: "Séance Push Avancée",
          objectif: "Développement pectoraux, épaules, triceps",
          dureeEstimee: 70,
          exercices: [
            exercices.find((e) => e.nom === "Pompes archer")._id,
            exercices.find((e) => e.nom === "Pike push-ups avancés")._id,
            exercices.find((e) => e.nom === "Dips triceps avancés")._id,
            exercices.find((e) => e.nom === "Pompes diamant")._id,
            exercices.find((e) => e.nom === "Planche")._id,
          ],
        },
        {
          jour: 2,
          nom: "Séance Pull Intensive",
          objectif: "Développement dorsaux et biceps",
          dureeEstimee: 65,
          exercices: [
            exercices.find((e) => e.nom === "Tractions négatives")._id,
            exercices.find((e) => e.nom === "Tractions")._id,
            exercices.find((e) => e.nom === "Superman")._id,
            exercices.find((e) => e.nom === "Planche")._id,
          ],
        },
        {
          jour: 3,
          nom: "Séance Legs Power",
          objectif: "Hypertrophie membres inférieurs",
          dureeEstimee: 75,
          exercices: [
            exercices.find((e) => e.nom === "Squats bulgares")._id,
            exercices.find((e) => e.nom === "Squats pistolet assistés")._id,
            exercices.find((e) => e.nom === "Squats isométriques")._id,
            exercices.find((e) => e.nom === "Superman")._id,
          ],
        },
        {
          jour: 5,
          nom: "Séance Upper Body Volume",
          objectif: "Volume maximal haut du corps",
          dureeEstimee: 80,
          exercices: [
            exercices.find((e) => e.nom === "Pompes archer")._id,
            exercices.find((e) => e.nom === "Tractions négatives")._id,
            exercices.find((e) => e.nom === "Dips triceps avancés")._id,
            exercices.find((e) => e.nom === "Pike push-ups avancés")._id,
            exercices.find((e) => e.nom === "Dips")._id,
            exercices.find((e) => e.nom === "Planche")._id,
          ],
        },
        {
          jour: 6,
          nom: "Séance Full Body Strength",
          objectif: "Force fonctionnelle complète",
          dureeEstimee: 70,
          exercices: [
            exercices.find((e) => e.nom === "Tractions")._id,
            exercices.find((e) => e.nom === "Squats bulgares")._id,
            exercices.find((e) => e.nom === "Pompes diamant")._id,
            exercices.find((e) => e.nom === "Squats isométriques")._id,
            exercices.find((e) => e.nom === "Superman")._id,
          ],
        },
      ],
    };

    // Sauvegarder le programme
    const nouveauProgramme = await Programme.create(massGainProgram);

    res.status(201).json({
      message: "Programme Prise de masse Intermédiaire créé avec succès !",
      programme: nouveauProgramme,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création du programme Prise de masse Intermédiaire:",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la création du programme",
    });
  }
};

// Récupérer programmes par niveau
export const getProgrammesByLevel = async (req, res) => {
  try {
    const { niveau } = req.params;

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

// Récupérer programmes par niveau et objectif
export const getProgrammesByProfile = async (req, res) => {
  try {
    const { niveau, objectif } = req.params;

    const programmes = await Programme.find({
      niveau: niveau,
      objectif: objectif,
    }).sort({ nom: 1 });

    res.status(200).json({
      message: `Programmes ${niveau} pour ${objectif} récupérés avec succès`,
      count: programmes.length,
      programmes,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des programmes par profil:",
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

// Ajouter le programme Perte de poids Débutant
export const addFullBodyProgram = async (req, res) => {
  try {
    // Vérifier si le programme existe déjà
    const existingProgram = await Programme.findOne({
      nom: "Perte de poids - Débutant",
    });
    if (existingProgram) {
      return res.status(400).json({
        message: "Le programme Perte de poids Débutant existe déjà",
      });
    }

    // Récupérer les exercices nécessaires
    const exercices = await Exercice.find({
      nom: {
        $in: ["Pompes", "Squats", "Planche", "Fentes", "Mountain Climbers"],
      },
    });

    if (exercices.length < 5) {
      return res.status(400).json({
        message:
          "Tous les exercices requis ne sont pas disponibles. Ajoutez d'abord les exercices de base.",
      });
    }

    // Créer le programme Perte de poids Débutant
    const fullBodyProgram = {
      nom: "Perte de poids - Débutant",
      description:
        "Programme complet 3 fois par semaine pour brûler les graisses et tonifier tout le corps",
      niveau: "Débutant",
      objectif: "Perte de poids",
      duree: 4, // 4 semaines
      seances: [
        {
          jour: 1,
          nom: "Séance Full Body A",
          objectif: "Renforcement corps entier + cardio",
          dureeEstimee: 45,
          exercices: [
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Squats")._id,
            exercices.find((e) => e.nom === "Planche")._id,
            exercices.find((e) => e.nom === "Mountain Climbers")._id,
          ],
        },
        {
          jour: 3,
          nom: "Séance Full Body B",
          objectif: "Renforcement + endurance",
          dureeEstimee: 45,
          exercices: [
            exercices.find((e) => e.nom === "Fentes")._id,
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Squats")._id,
            exercices.find((e) => e.nom === "Planche")._id,
          ],
        },
        {
          jour: 5,
          nom: "Séance Full Body C",
          objectif: "Circuit intensif",
          dureeEstimee: 50,
          exercices: [
            exercices.find((e) => e.nom === "Mountain Climbers")._id,
            exercices.find((e) => e.nom === "Fentes")._id,
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Squats")._id,
            exercices.find((e) => e.nom === "Planche")._id,
          ],
        },
      ],
    };

    // Sauvegarder le programme
    const nouveauProgramme = await Programme.create(fullBodyProgram);

    res.status(201).json({
      message: "Programme Perte de poids créé avec succès !",
      programme: nouveauProgramme,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création du programme Perte de poids:",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la création du programme",
    });
  }
};

// Ajouter le programme Prise de masse Débutant
export const addMassGainProgram = async (req, res) => {
  try {
    // Vérifier si le programme existe déjà
    const existingProgram = await Programme.findOne({
      nom: "Prise de masse - Débutant",
    });
    if (existingProgram) {
      return res.status(400).json({
        message: "Le programme Prise de masse Débutant existe déjà",
      });
    }

    // Récupérer les exercices nécessaires pour la prise de masse
    const exercices = await Exercice.find({
      nom: {
        $in: [
          "Pompes",
          "Pompes surélevées",
          "Squats",
          "Squats sautés",
          "Fentes",
          "Dips",
          "Pike push-ups",
          "Planche",
        ],
      },
    });

    if (exercices.length < 6) {
      return res.status(400).json({
        message:
          "Tous les exercices requis ne sont pas disponibles. Ajoutez d'abord les exercices de base.",
      });
    }

    // Créer le programme Prise de masse Débutant
    const massGainProgram = {
      nom: "Prise de masse - Débutant",
      description:
        "Programme intensif 4 fois par semaine pour développer la masse musculaire et la force",
      niveau: "Débutant",
      objectif: "Prise de masse",
      duree: 6, // 6 semaines
      seances: [
        {
          jour: 1,
          nom: "Séance Full Body Force A",
          objectif: "Développement haut du corps",
          dureeEstimee: 60,
          exercices: [
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Pike push-ups")._id,
            exercices.find((e) => e.nom === "Squats")._id,
            exercices.find((e) => e.nom === "Fentes")._id,
            exercices.find((e) => e.nom === "Planche")._id,
          ],
        },
        {
          jour: 2,
          nom: "Séance Full Body Force B",
          objectif: "Développement explosivité",
          dureeEstimee: 60,
          exercices: [
            exercices.find((e) => e.nom === "Pompes surélevées")._id,
            exercices.find((e) => e.nom === "Dips")._id,
            exercices.find((e) => e.nom === "Squats sautés")._id,
            exercices.find((e) => e.nom === "Fentes")._id,
            exercices.find((e) => e.nom === "Planche")._id,
          ],
        },
        {
          jour: 4,
          nom: "Séance Full Body Force C",
          objectif: "Volume et hypertrophie",
          dureeEstimee: 65,
          exercices: [
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Pompes surélevées")._id,
            exercices.find((e) => e.nom === "Squats")._id,
            exercices.find((e) => e.nom === "Dips")._id,
            exercices.find((e) => e.nom === "Pike push-ups")._id,
            exercices.find((e) => e.nom === "Planche")._id,
          ],
        },
        {
          jour: 6,
          nom: "Séance Full Body Force D",
          objectif: "Force maximale",
          dureeEstimee: 70,
          exercices: [
            exercices.find((e) => e.nom === "Pompes surélevées")._id,
            exercices.find((e) => e.nom === "Pike push-ups")._id,
            exercices.find((e) => e.nom === "Squats sautés")._id,
            exercices.find((e) => e.nom === "Squats")._id,
            exercices.find((e) => e.nom === "Dips")._id,
            exercices.find((e) => e.nom === "Fentes")._id,
          ],
        },
      ],
    };

    // Sauvegarder le programme
    const nouveauProgramme = await Programme.create(massGainProgram);

    res.status(201).json({
      message: "Programme Full Body Prise de masse créé avec succès !",
      programme: nouveauProgramme,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création du programme Prise de masse:",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la création du programme",
    });
  }
};

// Supprimer tous les programmes (fonction utilitaire)
export const deleteAllProgrammes = async (req, res) => {
  try {
    const result = await Programme.deleteMany({});

    res.status(200).json({
      message: `Tous les programmes ont été supprimés avec succès`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression des programmes:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la suppression des programmes",
    });
  }
};

// Ajouter le programme Entretien Débutant
export const addMaintenanceProgram = async (req, res) => {
  try {
    // Vérifier si le programme existe déjà
    const existingProgram = await Programme.findOne({
      nom: "Entretien - Débutant",
    });
    if (existingProgram) {
      return res.status(400).json({
        message: "Le programme Entretien Débutant existe déjà",
      });
    }

    // Récupérer les exercices nécessaires pour l'entretien
    const exercices = await Exercice.find({
      nom: {
        $in: [
          "Pompes",
          "Squats",
          "Planche",
          "Étirements des bras",
          "Marche sur place",
          "Étirements des jambes",
          "Rotation du tronc",
          "Fentes",
        ],
      },
    });

    if (exercices.length < 6) {
      return res.status(400).json({
        message:
          "Tous les exercices requis ne sont pas disponibles. Ajoutez d'abord les exercices de base.",
      });
    }

    // Créer le programme Entretien Débutant
    const maintenanceProgram = {
      nom: "Entretien - Débutant",
      description:
        "Programme doux 3 fois par semaine pour maintenir la forme physique et la mobilité",
      niveau: "Débutant",
      objectif: "Entretien",
      duree: 8, // 8 semaines
      seances: [
        {
          jour: 1,
          nom: "Séance Entretien A",
          objectif: "Mobilité et renforcement léger",
          dureeEstimee: 30,
          exercices: [
            exercices.find((e) => e.nom === "Marche sur place")._id,
            exercices.find((e) => e.nom === "Étirements des bras")._id,
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Squats")._id,
            exercices.find((e) => e.nom === "Étirements des jambes")._id,
          ],
        },
        {
          jour: 3,
          nom: "Séance Entretien B",
          objectif: "Renforcement et équilibre",
          dureeEstimee: 35,
          exercices: [
            exercices.find((e) => e.nom === "Rotation du tronc")._id,
            exercices.find((e) => e.nom === "Fentes")._id,
            exercices.find((e) => e.nom === "Planche")._id,
            exercices.find((e) => e.nom === "Marche sur place")._id,
            exercices.find((e) => e.nom === "Étirements des bras")._id,
          ],
        },
        {
          jour: 5,
          nom: "Séance Entretien C",
          objectif: "Flexibilité et détente",
          dureeEstimee: 25,
          exercices: [
            exercices.find((e) => e.nom === "Étirements des jambes")._id,
            exercices.find((e) => e.nom === "Rotation du tronc")._id,
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Squats")._id,
            exercices.find((e) => e.nom === "Étirements des bras")._id,
          ],
        },
      ],
    };

    // Sauvegarder le programme
    const nouveauProgramme = await Programme.create(maintenanceProgram);

    res.status(201).json({
      message: "Programme Entretien créé avec succès !",
      programme: nouveauProgramme,
    });
  } catch (error) {
    console.error("Erreur lors de la création du programme Entretien:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la création du programme",
    });
  }
};

// Ajouter le programme Force Débutant
export const addStrengthProgram = async (req, res) => {
  try {
    // Vérifier si le programme existe déjà
    const existingProgram = await Programme.findOne({
      nom: "Force - Débutant",
    });
    if (existingProgram) {
      return res.status(400).json({
        message: "Le programme Force Débutant existe déjà",
      });
    }

    // Récupérer les exercices nécessaires pour la force
    const exercices = await Exercice.find({
      nom: {
        $in: [
          "Pompes",
          "Pompes diamant",
          "Squats",
          "Squats isométriques",
          "Planche",
          "Planche latérale",
          "Tractions",
          "Dips",
          "Relevés de jambes",
          "Superman",
        ],
      },
    });

    if (exercices.length < 8) {
      return res.status(400).json({
        message:
          "Tous les exercices requis ne sont pas disponibles. Ajoutez d'abord les exercices de base.",
      });
    }

    // Créer le programme Force Débutant
    const strengthProgram = {
      nom: "Force - Débutant",
      description:
        "Programme 4 fois par semaine axé sur le développement de la force maximale et de la résistance",
      niveau: "Débutant",
      objectif: "Force",
      duree: 6, // 6 semaines
      seances: [
        {
          jour: 1,
          nom: "Séance Force Haut du corps",
          objectif: "Développement force membres supérieurs",
          dureeEstimee: 50,
          exercices: [
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Pompes diamant")._id,
            exercices.find((e) => e.nom === "Dips")._id,
            exercices.find((e) => e.nom === "Planche")._id,
            exercices.find((e) => e.nom === "Superman")._id,
          ],
        },
        {
          jour: 2,
          nom: "Séance Force Bas du corps",
          objectif: "Développement force membres inférieurs",
          dureeEstimee: 45,
          exercices: [
            exercices.find((e) => e.nom === "Squats")._id,
            exercices.find((e) => e.nom === "Squats isométriques")._id,
            exercices.find((e) => e.nom === "Relevés de jambes")._id,
            exercices.find((e) => e.nom === "Planche latérale")._id,
          ],
        },
        {
          jour: 4,
          nom: "Séance Force Mixte A",
          objectif: "Force fonctionnelle globale",
          dureeEstimee: 55,
          exercices: [
            exercices.find((e) => e.nom === "Tractions")._id,
            exercices.find((e) => e.nom === "Squats")._id,
            exercices.find((e) => e.nom === "Pompes diamant")._id,
            exercices.find((e) => e.nom === "Planche")._id,
            exercices.find((e) => e.nom === "Superman")._id,
          ],
        },
        {
          jour: 6,
          nom: "Séance Force Mixte B",
          objectif: "Force maximale et endurance",
          dureeEstimee: 50,
          exercices: [
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Squats isométriques")._id,
            exercices.find((e) => e.nom === "Dips")._id,
            exercices.find((e) => e.nom === "Relevés de jambes")._id,
            exercices.find((e) => e.nom === "Planche latérale")._id,
          ],
        },
      ],
    };

    // Sauvegarder le programme
    const nouveauProgramme = await Programme.create(strengthProgram);

    res.status(201).json({
      message: "Programme Force créé avec succès !",
      programme: nouveauProgramme,
    });
  } catch (error) {
    console.error("Erreur lors de la création du programme Force:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la création du programme",
    });
  }
};

// Ajouter le programme Perte de poids Intermédiaire
export const addWeightLossIntermediateProgram = async (req, res) => {
  try {
    // Vérifier si le programme existe déjà
    const existingProgram = await Programme.findOne({
      nom: "Perte de poids - Intermédiaire",
    });
    if (existingProgram) {
      return res.status(400).json({
        message: "Le programme Perte de poids Intermédiaire existe déjà",
      });
    }

    // Récupérer les exercices nécessaires pour la perte de poids intermédiaire
    const exercices = await Exercice.find({
      nom: {
        $in: [
          "Burpees complets",
          "Mountain Climbers rapides",
          "Jumping Jacks",
          "Pompes sautées",
          "Squats jump 180°",
          "Planche dynamique",
          "Burpees",
          "Mountain Climbers",
          "Squats sautés",
          "Pompes",
          "Fentes",
        ],
      },
    });

    if (exercices.length < 8) {
      return res.status(400).json({
        message:
          "Tous les exercices requis ne sont pas disponibles. Ajoutez d'abord les exercices de base.",
      });
    }

    // Créer le programme Perte de poids Intermédiaire
    const weightLossProgram = {
      nom: "Perte de poids - Intermédiaire",
      description:
        "Programme intensif 5 fois par semaine avec exercices avancés pour maximiser la perte de poids",
      niveau: "Intermédiaire",
      objectif: "Perte de poids",
      duree: 6, // 6 semaines
      seances: [
        {
          jour: 1,
          nom: "Séance HIIT Cardio A",
          objectif: "Brûlage intensif de calories",
          dureeEstimee: 45,
          exercices: [
            exercices.find((e) => e.nom === "Burpees complets")._id,
            exercices.find((e) => e.nom === "Mountain Climbers rapides")._id,
            exercices.find((e) => e.nom === "Jumping Jacks")._id,
            exercices.find((e) => e.nom === "Squats jump 180°")._id,
            exercices.find((e) => e.nom === "Pompes sautées")._id,
          ],
        },
        {
          jour: 2,
          nom: "Séance Force-Cardio",
          objectif: "Renforcement et combustion",
          dureeEstimee: 50,
          exercices: [
            exercices.find((e) => e.nom === "Planche dynamique")._id,
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Squats sautés")._id,
            exercices.find((e) => e.nom === "Mountain Climbers")._id,
            exercices.find((e) => e.nom === "Fentes")._id,
          ],
        },
        {
          jour: 3,
          nom: "Séance HIIT Cardio B",
          objectif: "Explosion métabolique",
          dureeEstimee: 40,
          exercices: [
            exercices.find((e) => e.nom === "Burpees")._id,
            exercices.find((e) => e.nom === "Jumping Jacks")._id,
            exercices.find((e) => e.nom === "Mountain Climbers rapides")._id,
            exercices.find((e) => e.nom === "Pompes sautées")._id,
          ],
        },
        {
          jour: 5,
          nom: "Séance Circuit Intensif",
          objectif: "Endurance et force",
          dureeEstimee: 55,
          exercices: [
            exercices.find((e) => e.nom === "Burpees complets")._id,
            exercices.find((e) => e.nom === "Planche dynamique")._id,
            exercices.find((e) => e.nom === "Squats jump 180°")._id,
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Mountain Climbers")._id,
            exercices.find((e) => e.nom === "Fentes")._id,
          ],
        },
        {
          jour: 6,
          nom: "Séance Cardio Final",
          objectif: "Maximisation perte de poids",
          dureeEstimee: 35,
          exercices: [
            exercices.find((e) => e.nom === "Jumping Jacks")._id,
            exercices.find((e) => e.nom === "Burpees")._id,
            exercices.find((e) => e.nom === "Mountain Climbers rapides")._id,
            exercices.find((e) => e.nom === "Squats sautés")._id,
          ],
        },
      ],
    };

    // Sauvegarder le programme
    const nouveauProgramme = await Programme.create(weightLossProgram);

    res.status(201).json({
      message: "Programme Perte de poids Intermédiaire créé avec succès !",
      programme: nouveauProgramme,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création du programme Perte de poids Intermédiaire:",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la création du programme",
    });
  }
};

// Ajouter le programme Prise de masse Avancé
export const addMassGainAdvancedProgram = async (req, res) => {
  try {
    // Vérifier si le programme existe déjà
    const existingProgram = await Programme.findOne({
      nom: "Prise de masse - Avancé",
    });
    if (existingProgram) {
      return res.status(400).json({
        message: "Le programme Prise de masse Avancé existe déjà",
      });
    }

    // Récupérer les exercices nécessaires pour la prise de masse avancée
    const exercices = await Exercice.find({
      nom: {
        $in: [
          "Handstand push-ups assistés",
          "Muscle-ups progression",
          "Pistol squats complets",
          "One-arm push-ups progression",
          "Planche avancée",
          "L-sit progression",
          "Pompes archer",
          "Squats bulgares",
          "Dips triceps avancés",
          "Pike push-ups avancés",
          "Tractions négatives",
          "Tractions",
          "Pompes sautées",
          "Squats jump 180°",
          "Planche dynamique",
          "Burpees complets",
        ],
      },
    });

    if (exercices.length < 12) {
      return res.status(400).json({
        message:
          "Tous les exercices requis ne sont pas disponibles. Ajoutez d'abord les exercices de base.",
      });
    }

    // Créer le programme Prise de masse Avancé
    const massGainAdvancedProgram = {
      nom: "Prise de masse - Avancé",
      description:
        "Programme intensif 6 fois par semaine avec exercices avancés pour maximiser l'hypertrophie et développer une force exceptionnelle",
      niveau: "Avancé",
      objectif: "Prise de masse",
      duree: 10, // 10 semaines
      seances: [
        {
          jour: 1,
          nom: "Séance Push Intensive",
          objectif: "Développement maximal pectoraux, épaules, triceps",
          dureeEstimee: 85,
          exercices: [
            exercices.find((e) => e.nom === "Handstand push-ups assistés")._id,
            exercices.find((e) => e.nom === "One-arm push-ups progression")._id,
            exercices.find((e) => e.nom === "Pompes archer")._id,
            exercices.find((e) => e.nom === "Pike push-ups avancés")._id,
            exercices.find((e) => e.nom === "Dips triceps avancés")._id,
            exercices.find((e) => e.nom === "Pompes sautées")._id,
            exercices.find((e) => e.nom === "Planche avancée")._id,
          ],
        },
        {
          jour: 2,
          nom: "Séance Pull Elite",
          objectif: "Force maximale dorsaux et biceps",
          dureeEstimee: 80,
          exercices: [
            exercices.find((e) => e.nom === "Muscle-ups progression")._id,
            exercices.find((e) => e.nom === "Tractions")._id,
            exercices.find((e) => e.nom === "Tractions négatives")._id,
            exercices.find((e) => e.nom === "L-sit progression")._id,
            exercices.find((e) => e.nom === "Planche dynamique")._id,
          ],
        },
        {
          jour: 3,
          nom: "Séance Legs Power Avancée",
          objectif: "Hypertrophie et puissance jambes",
          dureeEstimee: 90,
          exercices: [
            exercices.find((e) => e.nom === "Pistol squats complets")._id,
            exercices.find((e) => e.nom === "Squats bulgares")._id,
            exercices.find((e) => e.nom === "Squats jump 180°")._id,
            exercices.find((e) => e.nom === "Burpees complets")._id,
            exercices.find((e) => e.nom === "L-sit progression")._id,
          ],
        },
        {
          jour: 4,
          nom: "Séance Upper Body Volume+",
          objectif: "Volume maximal haut du corps",
          dureeEstimee: 95,
          exercices: [
            exercices.find((e) => e.nom === "Muscle-ups progression")._id,
            exercices.find((e) => e.nom === "Handstand push-ups assistés")._id,
            exercices.find((e) => e.nom === "One-arm push-ups progression")._id,
            exercices.find((e) => e.nom === "Pompes archer")._id,
            exercices.find((e) => e.nom === "Dips triceps avancés")._id,
            exercices.find((e) => e.nom === "Tractions négatives")._id,
            exercices.find((e) => e.nom === "Planche avancée")._id,
          ],
        },
        {
          jour: 5,
          nom: "Séance Functional Strength",
          objectif: "Force fonctionnelle avancée",
          dureeEstimee: 85,
          exercices: [
            exercices.find((e) => e.nom === "Pistol squats complets")._id,
            exercices.find((e) => e.nom === "Muscle-ups progression")._id,
            exercices.find((e) => e.nom === "Handstand push-ups assistés")._id,
            exercices.find((e) => e.nom === "L-sit progression")._id,
            exercices.find((e) => e.nom === "Planche dynamique")._id,
            exercices.find((e) => e.nom === "Burpees complets")._id,
          ],
        },
        {
          jour: 6,
          nom: "Séance Total Body Elite",
          objectif: "Synthèse force et hypertrophie",
          dureeEstimee: 100,
          exercices: [
            exercices.find((e) => e.nom === "One-arm push-ups progression")._id,
            exercices.find((e) => e.nom === "Tractions")._id,
            exercices.find((e) => e.nom === "Pistol squats complets")._id,
            exercices.find((e) => e.nom === "Handstand push-ups assistés")._id,
            exercices.find((e) => e.nom === "Squats bulgares")._id,
            exercices.find((e) => e.nom === "Pike push-ups avancés")._id,
            exercices.find((e) => e.nom === "Planche avancée")._id,
            exercices.find((e) => e.nom === "L-sit progression")._id,
          ],
        },
      ],
    };

    // Sauvegarder le programme
    const nouveauProgramme = await Programme.create(massGainAdvancedProgram);

    res.status(201).json({
      message: "Programme Prise de masse Avancé créé avec succès !",
      programme: nouveauProgramme,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création du programme Prise de masse Avancé:",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la création du programme",
    });
  }
};

// Ajouter le programme Entretien Avancé
export const addMaintenanceAdvancedProgram = async (req, res) => {
  try {
    // Vérifier si le programme existe déjà
    const existingProgram = await Programme.findOne({
      nom: "Entretien - Avancé",
    });
    if (existingProgram) {
      return res.status(400).json({
        message: "Le programme Entretien Avancé existe déjà",
      });
    }

    // Récupérer les exercices spécialisés pour l'entretien avancé
    const exercices = await Exercice.find({
      nom: {
        $in: [
          "Méditation en mouvement",
          "Étirements myofasciaux",
          "Proprioception avancée",
          "Yoga thérapeutique",
          "Mobilité articulaire complète",
          "Respiration fonctionnelle",
          "Automassage et trigger points",
          "Coordination neuro-motrice",
          "Réhabilitation posturale",
          "Récupération active",
        ],
      },
    });

    if (exercices.length < 8) {
      return res.status(400).json({
        message:
          "Tous les exercices spécialisés requis ne sont pas disponibles. Ajoutez d'abord les exercices d'entretien avancé.",
      });
    }

    // Créer le programme Entretien Avancé avec exercices spécialisés
    const maintenanceAdvancedProgram = {
      nom: "Entretien - Avancé",
      description:
        "Programme spécialisé 4 fois par semaine axé sur le bien-être, la mobilité avancée, l'équilibre et la récupération thérapeutique pour maintenir une forme optimale",
      niveau: "Avancé",
      objectif: "Entretien",
      duree: 12, // 12 semaines
      seances: [
        {
          jour: 1,
          nom: "Séance Wellness & Mobilité",
          objectif: "Mobilité thérapeutique et bien-être",
          dureeEstimee: 60,
          exercices: [
            exercices.find((e) => e.nom === "Mobilité articulaire complète")
              ?._id,
            exercices.find((e) => e.nom === "Étirements myofasciaux")?._id,
            exercices.find((e) => e.nom === "Respiration fonctionnelle")?._id,
            exercices.find((e) => e.nom === "Récupération active")?._id,
          ].filter(Boolean),
        },
        {
          jour: 3,
          nom: "Séance Équilibre & Coordination",
          objectif: "Proprioception et coordination avancée",
          dureeEstimee: 50,
          exercices: [
            exercices.find((e) => e.nom === "Proprioception avancée")?._id,
            exercices.find((e) => e.nom === "Coordination neuro-motrice")?._id,
            exercices.find((e) => e.nom === "Réhabilitation posturale")?._id,
            exercices.find((e) => e.nom === "Méditation en mouvement")?._id,
          ].filter(Boolean),
        },
        {
          jour: 5,
          nom: "Séance Yoga & Thérapie",
          objectif: "Pratiques thérapeutiques et récupération",
          dureeEstimee: 65,
          exercices: [
            exercices.find((e) => e.nom === "Yoga thérapeutique")?._id,
            exercices.find((e) => e.nom === "Automassage et trigger points")
              ?._id,
            exercices.find((e) => e.nom === "Respiration fonctionnelle")?._id,
            exercices.find((e) => e.nom === "Étirements myofasciaux")?._id,
          ].filter(Boolean),
        },
        {
          jour: 7,
          nom: "Séance Récupération & Maintenance",
          objectif: "Récupération complète et maintenance posturale",
          dureeEstimee: 45,
          exercices: [
            exercices.find((e) => e.nom === "Récupération active")?._id,
            exercices.find((e) => e.nom === "Mobilité articulaire complète")
              ?._id,
            exercices.find((e) => e.nom === "Méditation en mouvement")?._id,
            exercices.find((e) => e.nom === "Réhabilitation posturale")?._id,
          ].filter(Boolean),
        },
      ],
    };

    // Sauvegarder le programme
    const nouveauProgramme = await Programme.create(maintenanceAdvancedProgram);

    res.status(201).json({
      message: "Programme Entretien Avancé créé avec succès !",
      programme: nouveauProgramme,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création du programme Entretien Avancé:",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la création du programme",
    });
  }
};

// Ajouter le programme Force Intermédiaire
export const addStrengthIntermediateProgram = async (req, res) => {
  try {
    // Vérifier si le programme existe déjà
    const existingProgram = await Programme.findOne({
      nom: "Force - Intermédiaire",
    });
    if (existingProgram) {
      return res.status(400).json({
        message: "Le programme Force Intermédiaire existe déjà",
      });
    }

    // Récupérer les exercices nécessaires pour la force intermédiaire
    const exercices = await Exercice.find({
      nom: {
        $in: [
          "Tractions",
          "Pompes diamant",
          "Pistol squats complets",
          "Pompes archer",
          "Muscle-ups progression",
          "Handstand push-ups assistés",
          "Planche avancée",
          "L-sit progression",
          "Squats sautés",
          "Burpees",
          "Dips",
          "Squats bulgares",
          "Fentes",
          "Mountain Climbers",
          "Jumping Jacks",
          "Planche",
        ],
      },
    });

    if (exercices.length < 12) {
      return res.status(400).json({
        message:
          "Tous les exercices requis ne sont pas disponibles. Ajoutez d'abord les exercices de base.",
      });
    }

    // Créer le programme Force Intermédiaire
    const strengthIntermediateProgram = {
      nom: "Force - Intermédiaire",
      description:
        "Programme de force intermédiaire 4 fois par semaine pour développer la puissance et la force musculaire avec des exercices au poids du corps",
      niveau: "Intermédiaire",
      objectif: "Force",
      duree: 10, // 10 semaines
      seances: [
        {
          jour: 1,
          nom: "Séance Haut du corps Force",
          objectif: "Force maximale haut du corps",
          dureeEstimee: 55,
          exercices: [
            exercices.find((e) => e.nom === "Tractions")._id,
            exercices.find((e) => e.nom === "Pompes diamant")._id,
            exercices.find((e) => e.nom === "Pompes archer")._id,
            exercices.find((e) => e.nom === "Dips")._id,
            exercices.find((e) => e.nom === "L-sit progression")._id,
            exercices.find((e) => e.nom === "Planche avancée")._id,
          ],
        },
        {
          jour: 2,
          nom: "Séance Bas du corps Puissance",
          objectif: "Force explosive jambes",
          dureeEstimee: 50,
          exercices: [
            exercices.find((e) => e.nom === "Pistol squats complets")._id,
            exercices.find((e) => e.nom === "Squats sautés")._id,
            exercices.find((e) => e.nom === "Squats bulgares")._id,
            exercices.find((e) => e.nom === "Fentes")._id,
            exercices.find((e) => e.nom === "Burpees")._id,
          ],
        },
        {
          jour: 4,
          nom: "Séance Force Avancée",
          objectif: "Mouvements de force avancés",
          dureeEstimee: 60,
          exercices: [
            exercices.find((e) => e.nom === "Muscle-ups progression")._id,
            exercices.find((e) => e.nom === "Handstand push-ups assistés")._id,
            exercices.find((e) => e.nom === "Pistol squats complets")._id,
            exercices.find((e) => e.nom === "L-sit progression")._id,
            exercices.find((e) => e.nom === "Planche avancée")._id,
          ],
        },
        {
          jour: 6,
          nom: "Séance Conditionnement",
          objectif: "Force-endurance et conditionnement",
          dureeEstimee: 45,
          exercices: [
            exercices.find((e) => e.nom === "Burpees")._id,
            exercices.find((e) => e.nom === "Mountain Climbers")._id,
            exercices.find((e) => e.nom === "Jumping Jacks")._id,
            exercices.find((e) => e.nom === "Planche")._id,
            exercices.find((e) => e.nom === "Squats sautés")._id,
          ],
        },
      ],
    };

    // Sauvegarder le programme
    const nouveauProgramme = await Programme.create(
      strengthIntermediateProgram
    );

    res.status(201).json({
      message: "Programme Force Intermédiaire créé avec succès !",
      programme: nouveauProgramme,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création du programme Force Intermédiaire:",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la création du programme",
    });
  }
};

// Ajouter le programme Entretien Intermédiaire
export const addMaintenanceIntermediateProgram = async (req, res) => {
  try {
    // Vérifier si le programme existe déjà
    const existingProgram = await Programme.findOne({
      nom: "Entretien - Intermédiaire",
    });
    if (existingProgram) {
      return res.status(400).json({
        message: "Le programme Entretien Intermédiaire existe déjà",
      });
    }

    // Récupérer les exercices nécessaires pour l'entretien intermédiaire
    const exercices = await Exercice.find({
      nom: {
        $in: [
          "Yoga flow basique",
          "Étirements dynamiques",
          "Cardio modéré",
          "Renforcement fonctionnel",
          "Équilibre avancé",
          "Récupération active",
          "Pompes",
          "Squats",
          "Planche",
          "Étirements des bras",
          "Étirements des jambes",
          "Rotation du tronc",
          "Marche sur place",
          "Planche latérale",
        ],
      },
    });

    if (exercices.length < 10) {
      return res.status(400).json({
        message:
          "Tous les exercices requis ne sont pas disponibles. Ajoutez d'abord les exercices de base.",
      });
    }

    // Créer le programme Entretien Intermédiaire
    const maintenanceIntermediateProgram = {
      nom: "Entretien - Intermédiaire",
      description:
        "Programme d'entretien intermédiaire 4 fois par semaine combinant mobilité, renforcement modéré et récupération pour maintenir une bonne condition physique",
      niveau: "Intermédiaire",
      objectif: "Entretien",
      duree: 10, // 10 semaines
      seances: [
        {
          jour: 1,
          nom: "Séance Mobilité & Bien-être",
          objectif: "Mobilité et détente",
          dureeEstimee: 45,
          exercices: [
            exercices.find((e) => e.nom === "Yoga flow basique")._id,
            exercices.find((e) => e.nom === "Étirements dynamiques")._id,
            exercices.find((e) => e.nom === "Rotation du tronc")._id,
            exercices.find((e) => e.nom === "Étirements des bras")._id,
            exercices.find((e) => e.nom === "Étirements des jambes")._id,
          ],
        },
        {
          jour: 3,
          nom: "Séance Cardio Léger",
          objectif: "Endurance douce",
          dureeEstimee: 40,
          exercices: [
            exercices.find((e) => e.nom === "Cardio modéré")._id,
            exercices.find((e) => e.nom === "Marche sur place")._id,
            exercices.find((e) => e.nom === "Équilibre avancé")._id,
            exercices.find((e) => e.nom === "Renforcement fonctionnel")._id,
          ],
        },
        {
          jour: 5,
          nom: "Séance Renforcement Modéré",
          objectif: "Maintien de la force",
          dureeEstimee: 50,
          exercices: [
            exercices.find((e) => e.nom === "Pompes")._id,
            exercices.find((e) => e.nom === "Squats")._id,
            exercices.find((e) => e.nom === "Planche")._id,
            exercices.find((e) => e.nom === "Planche latérale")._id,
            exercices.find((e) => e.nom === "Renforcement fonctionnel")._id,
          ],
        },
        {
          jour: 7,
          nom: "Séance Récupération",
          objectif: "Récupération active",
          dureeEstimee: 35,
          exercices: [
            exercices.find((e) => e.nom === "Récupération active")._id,
            exercices.find((e) => e.nom === "Yoga flow basique")._id,
            exercices.find((e) => e.nom === "Étirements des bras")._id,
            exercices.find((e) => e.nom === "Étirements des jambes")._id,
          ],
        },
      ],
    };

    // Sauvegarder le programme
    const nouveauProgramme = await Programme.create(
      maintenanceIntermediateProgram
    );

    res.status(201).json({
      message: "Programme Entretien Intermédiaire créé avec succès !",
      programme: nouveauProgramme,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création du programme Entretien Intermédiaire:",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la création du programme",
    });
  }
};

// Ajouter le programme Force Avancé
export const addStrengthAdvancedProgram = async (req, res) => {
  try {
    // Vérifier si le programme existe déjà
    const existingProgram = await Programme.findOne({
      nom: "Force - Avancé",
    });
    if (existingProgram) {
      return res.status(400).json({
        message: "Le programme Force Avancé existe déjà",
      });
    }

    // Récupérer les exercices spécialisés pour la force avancée
    const exercices = await Exercice.find({
      nom: {
        $in: [
          "One-arm push-ups",
          "Handstand push-ups complets",
          "Muscle-ups stricts",
          "Pistol squats avec poids",
          "Human flag",
          "Front lever",
          "Planche maltaise",
          "One-arm handstand",
          "Archer pull-ups",
          "Weighted dips",
          "Muscle-ups progression",
          "Pistol squats complets",
          "Planche avancée",
          "L-sit progression",
          "Tractions",
        ],
      },
    });

    if (exercices.length < 12) {
      return res.status(400).json({
        message:
          "Tous les exercices spécialisés requis ne sont pas disponibles. Ajoutez d'abord les exercices de force avancée.",
      });
    }

    // Créer le programme Force Avancé
    const strengthAdvancedProgram = {
      nom: "Force - Avancé",
      description:
        "Programme de force avancé 5 fois par semaine pour atteindre les mouvements de force extrême et développer une puissance maximale",
      niveau: "Avancé",
      objectif: "Force",
      duree: 12, // 12 semaines
      seances: [
        {
          jour: 1,
          nom: "Séance Poussée Extrême",
          objectif: "Force maximale poussée",
          dureeEstimee: 70,
          exercices: [
            exercices.find((e) => e.nom === "One-arm push-ups")?._id,
            exercices.find((e) => e.nom === "Handstand push-ups complets")?._id,
            exercices.find((e) => e.nom === "Planche maltaise")?._id,
            exercices.find((e) => e.nom === "Weighted dips")?._id,
            exercices.find((e) => e.nom === "One-arm handstand")?._id,
          ].filter(Boolean),
        },
        {
          jour: 2,
          nom: "Séance Traction Avancée",
          objectif: "Force de tirage maximale",
          dureeEstimee: 65,
          exercices: [
            exercices.find((e) => e.nom === "Muscle-ups stricts")?._id,
            exercices.find((e) => e.nom === "Archer pull-ups")?._id,
            exercices.find((e) => e.nom === "Front lever")?._id,
            exercices.find((e) => e.nom === "Human flag")?._id,
            exercices.find((e) => e.nom === "Tractions")?._id,
          ].filter(Boolean),
        },
        {
          jour: 4,
          nom: "Séance Jambes Puissance",
          objectif: "Force explosive des jambes",
          dureeEstimee: 60,
          exercices: [
            exercices.find((e) => e.nom === "Pistol squats avec poids")?._id,
            exercices.find((e) => e.nom === "Pistol squats complets")?._id,
            exercices.find((e) => e.nom === "Human flag")?._id,
            exercices.find((e) => e.nom === "L-sit progression")?._id,
          ].filter(Boolean),
        },
        {
          jour: 5,
          nom: "Séance Statiques Extrêmes",
          objectif: "Maintiens isométriques avancés",
          dureeEstimee: 55,
          exercices: [
            exercices.find((e) => e.nom === "Front lever")?._id,
            exercices.find((e) => e.nom === "Planche maltaise")?._id,
            exercices.find((e) => e.nom === "Human flag")?._id,
            exercices.find((e) => e.nom === "One-arm handstand")?._id,
            exercices.find((e) => e.nom === "Planche avancée")?._id,
          ].filter(Boolean),
        },
        {
          jour: 7,
          nom: "Séance Intégration Complète",
          objectif: "Combinaison de tous les mouvements",
          dureeEstimee: 75,
          exercices: [
            exercices.find((e) => e.nom === "Muscle-ups stricts")?._id,
            exercices.find((e) => e.nom === "One-arm push-ups")?._id,
            exercices.find((e) => e.nom === "Pistol squats avec poids")?._id,
            exercices.find((e) => e.nom === "Handstand push-ups complets")?._id,
            exercices.find((e) => e.nom === "Front lever")?._id,
          ].filter(Boolean),
        },
      ],
    };

    // Sauvegarder le programme
    const nouveauProgramme = await Programme.create(strengthAdvancedProgram);

    res.status(201).json({
      message: "Programme Force Avancé créé avec succès !",
      programme: nouveauProgramme,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création du programme Force Avancé:",
      error
    );
    res.status(500).json({
      message: "Erreur serveur lors de la création du programme",
    });
  }
};

// Ajouter tous les programmes d'un coup
export const addAllPrograms = async (req, res) => {
  try {
    const results = [];
    const errors = [];

    // Liste de tous les programmes à ajouter
    const programFunctions = [
      { name: "Mass Gain Intermediate", func: addMassGainIntermediateProgram },
      { name: "Full Body", func: addFullBodyProgram },
      { name: "Mass Gain", func: addMassGainProgram },
      { name: "Maintenance", func: addMaintenanceProgram },
      { name: "Strength", func: addStrengthProgram },
      { name: "Strength Intermediate", func: addStrengthIntermediateProgram },
      { name: "Strength Advanced", func: addStrengthAdvancedProgram },
      {
        name: "Maintenance Intermediate",
        func: addMaintenanceIntermediateProgram,
      },
      {
        name: "Weight Loss Intermediate",
        func: addWeightLossIntermediateProgram,
      },
      { name: "Mass Gain Advanced", func: addMassGainAdvancedProgram },
      { name: "Maintenance Advanced", func: addMaintenanceAdvancedProgram },
    ];

    // Fonction helper pour simuler une requête/réponse
    const createMockReqRes = () => {
      return {
        req: {},
        res: {
          status: (code) => ({
            json: (data) => ({ statusCode: code, data }),
          }),
        },
      };
    };

    // Exécuter chaque fonction de programme
    for (const { name, func } of programFunctions) {
      try {
        const { req, res } = createMockReqRes();
        const result = await func(req, res);

        if (result && result.statusCode === 201) {
          results.push(`✅ ${name}: créé avec succès`);
        } else if (result && result.statusCode === 400) {
          results.push(`⚠️ ${name}: existe déjà`);
        } else {
          results.push(`✅ ${name}: traité`);
        }
      } catch (error) {
        errors.push(`❌ ${name}: ${error.message}`);
      }
    }

    res.status(200).json({
      message: "Processus de création des programmes terminé",
      results,
      errors,
      summary: {
        total: programFunctions.length,
        success: results.length,
        errors: errors.length,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de tous les programmes:", error);
    res.status(500).json({
      message: "Erreur serveur lors de l'ajout des programmes",
      error: error.message,
    });
  }
};
