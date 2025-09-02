import Exercice from "../models/Exercice.js";

// Récupérer tous les exercices
export const getAllExercices = async (req, res) => {
  try {
    const exercices = await Exercice.find().sort({ nom: 1 });

    res.status(200).json({
      message: "Exercices récupérés avec succès",
      count: exercices.length,
      exercices,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des exercices:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des exercices",
    });
  }
};

// Récupérer un exercice par ID
export const getExerciceById = async (req, res) => {
  try {
    const { id } = req.params;

    const exercice = await Exercice.findById(id);

    if (!exercice) {
      return res.status(404).json({
        message: "Exercice non trouvé",
      });
    }

    res.status(200).json({
      message: "Exercice récupéré avec succès",
      exercice,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'exercice:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération de l'exercice",
    });
  }
};

// Ajouter des exercices de base (fonction utilitaire)
export const addBasicExercices = async (req, res) => {
  try {
    // Vérifier si des exercices existent déjà
    const existingCount = await Exercice.countDocuments();
    if (existingCount > 0) {
      return res.status(400).json({
        message: `Il y a déjà ${existingCount} exercices dans la base. Supprimez-les d'abord si vous voulez réinitialiser.`,
      });
    }

    const exercicesDeBase = [
      {
        nom: "Pompes",
        description: "Exercice de base pour les pectoraux, épaules et triceps",
        groupesMusculaires: ["Pectoraux", "Épaules", "Triceps"],
        instructions: [
          "Placez-vous en position de planche, mains au sol à largeur d'épaules",
          "Gardez le corps bien droit des talons à la tête",
          "Descendez en pliant les bras jusqu'à ce que la poitrine touche presque le sol",
          "Poussez pour remonter à la position de départ",
          "Répétez le mouvement de manière contrôlée",
        ],
        series: 3,
        repetitions: "8-15",
        niveau: "Débutant",
      },
      {
        nom: "Squats",
        description: "Exercice fondamental pour les jambes et fessiers",
        groupesMusculaires: ["Quadriceps", "Fessiers", "Ischio-jambiers"],
        instructions: [
          "Debout, pieds écartés à largeur d'épaules",
          "Descendez comme si vous vous asseyiez sur une chaise",
          "Gardez le dos droit et les genoux alignés avec les pieds",
          "Descendez jusqu'à ce que les cuisses soient parallèles au sol",
          "Remontez en poussant sur les talons",
        ],
        series: 3,
        repetitions: "12-20",
        niveau: "Débutant",
      },
      {
        nom: "Planche",
        description: "Exercice de gainage pour les abdominaux et le core",
        groupesMusculaires: ["Abdominaux", "Corps entier"],
        instructions: [
          "Placez-vous en position de planche sur les avant-bras",
          "Gardez le corps bien droit des talons à la tête",
          "Contractez les abdominaux et les fessiers",
          "Respirez normalement pendant l'exercice",
          "Maintenez la position sans cambrer le dos",
        ],
        series: 3,
        repetitions: "30-60 secondes",
        duree: 30,
        niveau: "Débutant",
      },
      {
        nom: "Tractions",
        description: "Exercice pour le dos et les biceps",
        groupesMusculaires: ["Dorsaux", "Biceps"],
        instructions: [
          "Suspendez-vous à une barre, mains en pronation",
          "Tirez votre corps vers le haut jusqu'à ce que le menton dépasse la barre",
          "Descendez de manière contrôlée",
          "Gardez les épaules actives et évitez de vous balancer",
        ],
        series: 3,
        repetitions: "3-8",
        niveau: "Intermédiaire",
      },
      {
        nom: "Fentes",
        description: "Exercice unilatéral pour les jambes",
        groupesMusculaires: ["Quadriceps", "Fessiers", "Ischio-jambiers"],
        instructions: [
          "Debout, faites un grand pas en avant",
          "Descendez en pliant les deux genoux à 90°",
          "Le genou arrière ne doit pas toucher le sol",
          "Poussez sur le talon avant pour revenir debout",
          "Alternez les jambes ou faites toutes les répétitions d'un côté",
        ],
        series: 3,
        repetitions: "10-15 par jambe",
        niveau: "Débutant",
      },
      {
        nom: "Dips",
        description: "Exercice pour les triceps et pectoraux",
        groupesMusculaires: ["Triceps", "Pectoraux", "Épaules"],
        instructions: [
          "Placez les mains sur une chaise ou un banc derrière vous",
          "Tendez les jambes devant vous",
          "Descendez en pliant les bras",
          "Remontez en poussant avec les triceps",
          "Gardez le dos près du support",
        ],
        series: 3,
        repetitions: "8-12",
        niveau: "Intermédiaire",
      },
      {
        nom: "Mountain Climbers",
        description: "Exercice cardio et de renforcement",
        groupesMusculaires: ["Abdominaux", "Corps entier"],
        instructions: [
          "Placez-vous en position de planche",
          "Amenez alternativement les genoux vers la poitrine",
          "Gardez les hanches basses",
          "Maintenez un rythme rapide",
          "Respirez de manière régulière",
        ],
        series: 3,
        repetitions: "20-30 par jambe",
        niveau: "Intermédiaire",
      },
      {
        nom: "Burpees",
        description: "Exercice complet alliant force et cardio",
        groupesMusculaires: ["Corps entier"],
        instructions: [
          "Debout, descendez en squat et placez les mains au sol",
          "Sautez pour étendre les jambes en position de planche",
          "Faites une pompe (optionnel)",
          "Ramenez les pieds vers les mains",
          "Sautez en l'air avec les bras tendus vers le haut",
        ],
        series: 3,
        repetitions: "5-10",
        niveau: "Avancé",
      },
    ];

    // Insérer tous les exercices
    const exercicesAjoutes = await Exercice.insertMany(exercicesDeBase);

    res.status(201).json({
      message: `${exercicesAjoutes.length} exercices de base ajoutés avec succès !`,
      exercices: exercicesAjoutes,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout des exercices de base:", error);
    res.status(500).json({
      message: "Erreur serveur lors de l'ajout des exercices de base",
    });
  }
};
