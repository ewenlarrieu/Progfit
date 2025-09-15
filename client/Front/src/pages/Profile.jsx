import React, { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '+33 1 23 45 67 89',
    birthDate: '1990-05-15',
    height: '175',
    weight: '70',
    fitnessLevel: 'intermediate',
    goals: ['weight_loss', 'muscle_gain'],
    preferences: {
      notifications: true,
      emailUpdates: false,
      publicProfile: true
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleGoalChange = (goal) => {
    setProfileData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleSave = () => {
    // TODO: Implémenter la sauvegarde
    console.log('Sauvegarde des données:', profileData);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'personal', name: 'Informations personnelles', icon: '👤' },
    { id: 'fitness', name: 'Profil fitness', icon: '💪' },
    { id: 'preferences', name: 'Préférences', icon: '⚙️' }
  ];

  const fitnessLevels = [
    { value: 'beginner', label: 'Débutant' },
    { value: 'intermediate', label: 'Intermédiaire' },
    { value: 'advanced', label: 'Avancé' }
  ];

  const goalOptions = [
    { value: 'weight_loss', label: 'Perte de poids', icon: '🔥' },
    { value: 'muscle_gain', label: 'Prise de muscle', icon: '💪' },
    { value: 'endurance', label: 'Endurance', icon: '🏃‍♂️' },
    { value: 'flexibility', label: 'Flexibilité', icon: '🧘‍♀️' },
    { value: 'strength', label: 'Force', icon: '🏋️‍♂️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <p className="text-gray-600">{profileData.email}</p>
              </div>
            </div>
            
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
            >
              {isEditing ? 'Sauvegarder' : 'Modifier'}
            </button>
          </div>
        </div>

        {/* Onglets */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Onglet Informations personnelles */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de naissance
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={profileData.birthDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            )}

            {/* Onglet Profil fitness */}
            {activeTab === 'fitness' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taille (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={profileData.height}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Poids (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={profileData.weight}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niveau de fitness
                  </label>
                  <select
                    name="fitnessLevel"
                    value={profileData.fitnessLevel}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                  >
                    {fitnessLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Objectifs fitness
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {goalOptions.map(goal => (
                      <label
                        key={goal.value}
                        className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          profileData.goals.includes(goal.value)
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        } ${!isEditing ? 'pointer-events-none opacity-60' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={profileData.goals.includes(goal.value)}
                          onChange={() => handleGoalChange(goal.value)}
                          disabled={!isEditing}
                          className="hidden"
                        />
                        <span className="text-2xl">{goal.icon}</span>
                        <span className="font-medium">{goal.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Préférences */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Notifications push</h3>
                      <p className="text-sm text-gray-600">Recevoir des notifications pour les rappels d'entraînement</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferences.notifications"
                        checked={profileData.preferences.notifications}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Emails de mise à jour</h3>
                      <p className="text-sm text-gray-600">Recevoir des emails sur les nouveaux programmes et conseils</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferences.emailUpdates"
                        checked={profileData.preferences.emailUpdates}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Profil public</h3>
                      <p className="text-sm text-gray-600">Permettre aux autres utilisateurs de voir vos statistiques</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferences.publicProfile"
                        checked={profileData.preferences.publicProfile}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Zone de danger</h3>
                  <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200">
                    Supprimer mon compte
                  </button>
                  <p className="text-sm text-gray-600 mt-2">
                    Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;