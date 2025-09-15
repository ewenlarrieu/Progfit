import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Données d'exemple
  const mockUserData = {
    name: "Jean Dupont",
    joinDate: "Mars 2024",
    currentStreak: 7,
    totalWorkouts: 45,
    totalHours: 67,
    caloriesBurned: 12500,
    currentPrograms: [
      {
        id: 1,
        name: "Cardio Intensif",
        progress: 75,
        nextSession: "Demain, 18h00"
      },
      {
        id: 2,
        name: "Musculation",
        progress: 40,
        nextSession: "Jeudi, 19h30"
      }
    ],
    recentWorkouts: [
      {
        id: 1,
        name: "HIIT Dynamique",
        date: "Aujourd'hui",
        duration: "25 min",
        calories: 350
      },
      {
        id: 2,
        name: "Cardio Intensif",
        date: "Hier",
        duration: "30 min",
        calories: 420
      },
      {
        id: 3,
        name: "Mobilité",
        date: "Avant-hier",
        duration: "20 min",
        calories: 120
      }
    ]
  };

  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => {
      setUserData(mockUserData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Chargement de votre dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête de bienvenue */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Salut {userData.name} ! 👋
              </h1>
              <p className="text-gray-600 mt-2">
                Membre depuis {userData.joinDate} • Série actuelle: {userData.currentStreak} jours
              </p>
            </div>
            <div className="hidden md:block">
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200">
                Nouveau programme
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <span className="text-2xl">🏋️‍♂️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Séances totales</p>
                <p className="text-2xl font-bold text-gray-900">{userData.totalWorkouts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">⏱️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Heures d'entraînement</p>
                <p className="text-2xl font-bold text-gray-900">{userData.totalHours}h</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-2xl">🔥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Calories brûlées</p>
                <p className="text-2xl font-bold text-gray-900">{userData.caloriesBurned.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Série actuelle</p>
                <p className="text-2xl font-bold text-gray-900">{userData.currentStreak} jours</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Programmes en cours */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Programmes en cours</h2>
            <div className="space-y-4">
              {userData.currentPrograms.map(program => (
                <div key={program.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{program.name}</h3>
                    <span className="text-sm text-gray-600">{program.progress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${program.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Prochaine séance</span>
                    <span className="text-sm font-medium text-gray-900">{program.nextSession}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
              Voir tous les programmes
            </button>
          </div>

          {/* Séances récentes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Séances récentes</h2>
            <div className="space-y-4">
              {userData.recentWorkouts.map(workout => (
                <div key={workout.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{workout.name}</h3>
                    <p className="text-sm text-gray-600">{workout.date} • {workout.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{workout.calories}</p>
                    <p className="text-xs text-gray-600">calories</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
              Voir l'historique complet
            </button>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-3 bg-red-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200">
              <span className="text-xl">🚀</span>
              <span>Commencer une séance</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
              <span className="text-xl">📊</span>
              <span>Voir mes statistiques</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 bg-green-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200">
              <span className="text-xl">🎯</span>
              <span>Fixer un objectif</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;