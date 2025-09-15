import React, { useState, useEffect } from 'react';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Données d'exemple des programmes
  const programsData = [
    {
      id: 1,
      title: "Cardio Intensif",
      description: "Améliore ton endurance et brûle des calories efficacement",
      duration: "30 min",
      difficulty: "Intermédiaire",
      category: "cardio",
      image: "🏃‍♂️",
      exercises: 12,
      calories: "300-400",
      equipment: "Aucun"
    },
    {
      id: 2,
      title: "Musculation Complète",
      description: "Gagne en force et en masse musculaire",
      duration: "45 min",
      difficulty: "Avancé",
      category: "musculation",
      image: "💪",
      exercises: 8,
      calories: "250-350",
      equipment: "Haltères"
    },
    {
      id: 3,
      title: "Mobilité & Étirements",
      description: "Étire ton corps et améliore ta posture",
      duration: "20 min",
      difficulty: "Débutant",
      category: "mobilite",
      image: "🧘‍♀️",
      exercises: 15,
      calories: "100-150",
      equipment: "Tapis"
    },
    {
      id: 4,
      title: "HIIT Dynamique",
      description: "Brûle un max de calories en peu de temps",
      duration: "25 min",
      difficulty: "Avancé",
      category: "hiit",
      image: "⚡",
      exercises: 10,
      calories: "400-500",
      equipment: "Aucun"
    },
    {
      id: 5,
      title: "Prise de Masse",
      description: "Développe ta masse musculaire efficacement",
      duration: "60 min",
      difficulty: "Intermédiaire",
      category: "musculation",
      image: "🏋️‍♂️",
      exercises: 10,
      calories: "200-300",
      equipment: "Complet"
    },
    {
      id: 6,
      title: "Perte de Poids",
      description: "Brûle des graisses et affine ta silhouette",
      duration: "40 min",
      difficulty: "Intermédiaire",
      category: "cardio",
      image: "🔥",
      exercises: 14,
      calories: "350-450",
      equipment: "Minimal"
    }
  ];

  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => {
      setPrograms(programsData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredPrograms = filter === 'all' 
    ? programs 
    : programs.filter(program => program.category === filter);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterButtons = [
    { key: 'all', label: 'Tous', icon: '🏆' },
    { key: 'cardio', label: 'Cardio', icon: '🏃‍♂️' },
    { key: 'musculation', label: 'Musculation', icon: '💪' },
    { key: 'mobilite', label: 'Mobilité', icon: '🧘‍♀️' },
    { key: 'hiit', label: 'HIIT', icon: '⚡' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Chargement des programmes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Programmes Fitness
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos programmes personnalisés pour atteindre vos objectifs de remise en forme
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {filterButtons.map(button => (
            <button
              key={button.key}
              onClick={() => setFilter(button.key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                filter === button.key
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              <span className="text-lg">{button.icon}</span>
              <span>{button.label}</span>
            </button>
          ))}
        </div>

        {/* Compteur de programmes */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {filteredPrograms.length} programme{filteredPrograms.length > 1 ? 's' : ''} disponible{filteredPrograms.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Grille des programmes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map(program => (
            <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* En-tête de la carte */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{program.image}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(program.difficulty)}`}>
                    {program.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <p className="text-red-100 text-sm">{program.description}</p>
              </div>

              {/* Contenu de la carte */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Durée</span>
                    <span className="font-medium">{program.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Exercices</span>
                    <span className="font-medium">{program.exercises}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Calories</span>
                    <span className="font-medium">{program.calories}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Équipement</span>
                    <span className="font-medium">{program.equipment}</span>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-2">
                  <button className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200">
                    Commencer le programme
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                    Voir les détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun programme */}
        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Aucun programme trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de changer les filtres pour voir plus de programmes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;