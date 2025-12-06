import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { API_URL } from '../config/api'


export default function DetailsProgramms() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [programme, setProgramme] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleCommencerProgramme = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/api/user-programmes/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        alert('Inscription au programme réussie !');
        navigate(`/seance-entrainement/${id}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Erreur lors de l\'inscription au programme');
    }
  };

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/api/programmes/${id}`)
        .then(res => res.json())
        .then(data => setProgramme(data.programme))
        .catch(err => {});
    }
  }, [id]);

  
  if (!id) {
    return (
      <div className="flex min-h-screen bg-gray-50"
            style={
              { fontFamily: 'Poppins, sans-serif'}
            }>
        <NavBar />
        <div className="flex-1 md:ml-64 p-8 flex flex-col justify-center items-center">
          <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
            <h2 className="text-black text-2xl font-bold mb-4">Aucun programme sélectionné</h2>
            <p className="text-gray-600 mb-6">
              Veuillez sélectionner un programme dans la page Programme
            </p>
            <button 
              onClick={() => navigate('/programs')}
              className="bg-[#E22807] text-white px-6 py-3 rounded-lg hover:bg-[#c41c00] transition-colors font-medium"
            >
              Aller à la page Programme
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <nav>
        <NavBar />
      </nav>
      <main 
        className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8" 
        style={{ fontFamily: 'Poppins, sans-serif'}}
      >
        {programme && (
          <>
    
        <header className="mb-10">
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
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <article className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
            <h2 className="text-black font-bold text-lg sm:text-xl">Catégorie</h2>
            <p className="text-[#E22807] mt-2 text-base sm:text-lg">{programme.objectif}</p>
          </article>
          <article className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
            <h2 className="text-black font-bold text-lg sm:text-xl">Niveau</h2>
            <p className="text-[#E22807] mt-2 text-base sm:text-lg">{programme.difficulte}</p>
          </article>
          <article className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
            <h2 className="text-black font-bold text-lg sm:text-xl">Nombre d'exercices par semaine</h2>
            <p className="text-[#E22807] mt-2 text-base sm:text-lg">
              {programme.seances?.flatMap(seance => seance.exercices ).length }
            </p>
          </article>
        </section>

        
        <section>
          <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold underline mb-6">
            Planning hebdomadaire
          </h2>
          <p className="text-gray-700 text-lg mb-8 text-center">
            Ce programme est à réaliser pendant <span className="font-semibold text-[#E22807]">{programme.duree} semaines</span> consécutives pour obtenir des résultats optimaux.
          </p>
          <div className="flex flex-col items-center justify-center gap-8 w-full min-h-[60vh] mt-12">
            {programme.seances && programme.seances.map((seance, index) => (
              <article key={index} className="bg-white border-2 border-black rounded-lg p-8 min-h-24 w-full max-w-5xl transition-all duration-300">
                <h3 className='text-[#E22807] font-bold text-3xl mb-7'>Jour {seance.jour}</h3>
                <p className='font-bold text-black text-2xl mb-7'>Objectif : {seance.nom}</p>
                <p className='font-normal text-black text-2xl mb-7'>Durée estimée : {seance.dureeEstimee}min</p>
                <p className='font-normal text-black text-2xl'>Nombre d'exercices : {seance.exercices ? seance.exercices.length : 0}</p>
              </article>
            ))}
          </div>
        </section>
        

        <div className="flex justify-center mt-12 mb-8">
          <button 
            className="bg-[#E22807] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300 shadow-lg"
            onClick={handleCommencerProgramme}
          >
            Commencer ce programme
          </button>
        </div>
          </>
        )}
      </main>
    </div>
  )
}
