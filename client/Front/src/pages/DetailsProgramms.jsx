import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/common/NavBar'


export default function DetailsProgramms() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [programme, setProgramme] = useState(null);

  const handleCommencerProgramme = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://progfit.onrender.com/api/user-programmes/inscrire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          programmeId: id
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Inscription réussie, naviguer vers la page séance d'entraînement
        navigate(`/seance-entrainement/${id}`);
      } else {
        // Afficher l'erreur
        alert(data.message || 'Erreur lors de l\'inscription au programme');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'inscription au programme');
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`https://progfit.onrender.com/api/programmes/${id}`)
        .then(res => res.json())
        .then(data => setProgramme(data.programme))
        .catch(err => console.error('Erreur:', err));
    }
  }, [id]);

  // Si pas d'ID, afficher un message d'erreur
  if (!id) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <NavBar />
        <div className="flex-1 md:ml-64 p-8 flex flex-col justify-center items-center">
          <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-black text-2xl font-bold mb-4">Programme non trouvé</h2>
            <p className="text-gray-600 mb-6">
              Veuillez sélectionner un programme depuis la page programmes pour voir ses détails.
            </p>
            <button 
              onClick={() => navigate('/programs')}
              className="bg-[#E22807] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Aller aux programmes
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!programme) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <NavBar />
        <div className="flex-1 md:ml-64 p-8 flex justify-center items-center">
          <p className="text-black text-xl">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavBar />
      <div 
        className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8" 
        style={{ fontFamily: 'Poppins, sans-serif'}}
      >
        {/* Header programme */}
        <div className="mb-10">
          <h1 className="text-black font-bold text-2xl sm:text-3xl md:text-4xl">
            Programme <span className="text-[#E22807]">{programme.nom}</span>
          </h1>
          <p className="text-black text-lg sm:text-xl mt-2 font-medium">
            Durée : <span className="text-[#E22807] font-semibold">{programme.duree} semaines</span>
          </p>
          <p className="text-gray-600 mt-4 text-sm sm:text-base max-w-2xl">
            Voici un aperçu détaillé de votre programme. Retrouvez les objectifs, 
            la durée, ainsi que la structure de vos séances hebdomadaires.
          </p>
        </div>

        {/* Informations principales */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
            <p className="text-black font-bold text-lg sm:text-xl">Catégorie</p>
            <p className="text-[#E22807] mt-2 text-base sm:text-lg">{programme.objectif}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
            <p className="text-black font-bold text-lg sm:text-xl">Niveau</p>
            <p className="text-[#E22807] mt-2 text-base sm:text-lg">{programme.niveau}</p>
          </div>
           <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
            <p className="text-black font-bold text-lg sm:text-xl">Nombre d'exercices par semaine</p>
            <p className="text-[#E22807] mt-2 text-base sm:text-lg">
              {programme.seances ? 
                programme.seances.reduce((total, seance) => 
                  total + (seance.exercices ? seance.exercices.length : 0), 0
                ) 
                : 0
              }
            </p>
          </div>
          
      
        </div>

        {/* Planning hebdomadaire */}
        <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold underline mb-6">
          Planning hebdomadaire
        </h2>
        <p className="text-gray-700 text-lg mb-8 text-center">
          Ce programme est à réaliser pendant <span className="font-semibold text-[#E22807]">{programme.duree} semaines</span> consécutives pour obtenir des résultats optimaux.
        </p>
        <div className="flex flex-col items-center justify-center gap-8 w-full min-h-[60vh] mt-12">
          {programme.seances && programme.seances.map((seance, index) => (
            <div key={index} className="bg-white border-2 border-black rounded-lg p-8 min-h-24 w-full max-w-5xl transition-all duration-300">
              <p className='text-[#E22807] font-bold text-3xl mb-7'>Jour {seance.jour}</p>
              <p className='font-bold text-black text-2xl mb-7'>Objectif : {seance.nom}</p>
              <p className='font-normal text-black text-2xl mb-7'>Durée estimée : {seance.dureeEstimee}min</p>
              <p className='font-normal text-black text-2xl'>Nombre d'exercices : {seance.exercices ? seance.exercices.length : 0}</p>
            </div>
          ))}
        </div>
        
        {/* Bouton pour commencer le programme */}
        <div className="flex justify-center mt-12 mb-8">
          <button 
            className="bg-[#E22807] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300 shadow-lg"
            onClick={handleCommencerProgramme}
          >
            Commencer ce programme
          </button>
        </div>
      </div>
    </div>
  )
}
