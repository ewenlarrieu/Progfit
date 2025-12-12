import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';
import { API_URL } from '../config/api';
import { useToast } from '../context/ToastContext';

const Profile = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    niveau: '',
    objectif: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch(`${API_URL}/api/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setFormData({
            username: data.user.nom,
            niveau: data.user.niveau,
            objectif: data.user.objectif
          });
        }
      } catch (error) {
        // Erreur silencieuse
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Profil mis à jour avec succès !');
        setUser(data.user);
      } else {
        setMessage(data.message || 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      setMessage('Erreur lors de la mise à jour du profil');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/auth/delete-account`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        localStorage.removeItem('token');
        showToast('Votre compte a été supprimé', 'success');
        navigate('/');
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Erreur lors de la suppression du compte');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <NavBar/>
      <main className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8">
        <h1 className="text-[#E22807] font-bold text-4xl mb-8">Mon Profil</h1>

        {user && (
          <article className="bg-white border border-gray-300 rounded-xl p-8 max-w-2xl">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations personnelles</h2>

              {message && (
                <div role="alert" className={`mb-4 p-3 rounded-lg ${message.includes('succès') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                  Pseudo
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E22807] text-black"
                  required
                  aria-required="true"
                />
              </div>

              
       

            
              <div>
                <label htmlFor="niveau" className="block text-gray-700 font-semibold mb-2">
                  Niveau
                </label>
                <select
                  id="niveau"
                  name="niveau"
                  value={formData.niveau}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E22807] text-black"
                  required
                  aria-required="true"
                >
                  <option value="">Sélectionnez votre niveau</option>
                  <option value="debutant">Débutant</option>
                  <option value="intermediaire">Intermédiaire</option>
                  <option value="avance">Avancé</option>
                </select>
              </div>

              {/* Objectif */}
              <div>
                <label htmlFor="objectif" className="block text-gray-700 font-semibold mb-2">
                  Objectif
                </label>
                <select
                  id="objectif"
                  name="objectif"
                  value={formData.objectif}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E22807] text-black"
                  required
                  aria-required="true"
                >
                  <option value="">Sélectionnez votre objectif</option>
                  <option value="perte de poids">Perte de poids</option>
                  <option value="prise de masse">Prise de masse</option>
                  <option value="entretien">Entretien</option>
                  <option value="force">Force</option>
                </select>
              </div>

              {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full bg-[#E22807] hover:bg-[#c41c00] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                aria-label="Mettre à jour les informations du profil"
              >
                Mettre à jour le profil
              </button>
            </form>
            </section>

           
            <section className="mt-8 pt-8 border-t border-gray-300">
           
              <p className="text-gray-600 mb-4">
                La suppression de votre compte est irréversible. Toutes vos données seront définitivement perdues.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                aria-label="Supprimer définitivement le compte"
              >
                Supprimer mon compte
              </button>
            </section>
          </article>
        )}
      </main>
    </div>
  );
};

export default Profile;