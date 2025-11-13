import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/common/NavBar'



export default function SeanceEntrainement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [programme, setProgramme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seancesTerminees, setSeancesTerminees] = useState([]);

  const handleTerminerSeance = async (seanceIndex) => {
    if (window.confirm('Êtes-vous sûr de vouloir marquer cette séance comme terminée ?')) {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('https://progfit.onrender.com/api/user-programmes/seance/terminer', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            seanceIndex: seanceIndex,
            exercicesTermines: [] 
          })
        });

        const data = await response.json();

        if (response.ok) {
          alert(`Séance terminée ! Progression: ${data.progression}%`);
          // Ajouter la séance à la liste des séances terminées
          setSeancesTerminees(prev => [...prev, seanceIndex]);
        } else {
          alert(data.message || 'Erreur lors de la validation de la séance');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la validation de la séance');
      }
    }
  };



  const handleTerminerProgramme = async () => {
    if (window.confirm('Félicitations ! Êtes-vous sûr de vouloir marquer ce programme comme terminé ?')) {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('https://progfit.onrender.com/api/user-programmes/terminer', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (response.ok) {
          alert('Félicitations ! Programme terminé avec succès ! ');
          // Rediriger vers la page programmes
          navigate('/programs');
        } else {
          alert(data.message || 'Erreur lors de la finalisation du programme');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la finalisation du programme');
      }
    }
  };

  const handleAnnulerProgramme = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler ce programme ?')) {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('https://progfit.onrender.com/api/user-programmes/abandonner', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (response.ok) {
          alert('Programme annulé avec succès !');
          // Rediriger vers la page programmes
          navigate('/programs');
        } else {
          alert(data.message || 'Erreur lors de l\'annulation du programme');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'annulation du programme');
      }
    }
  };

  useEffect(() => {
    const fetchProgramme = async () => {
      try {
        setLoading(true);
        
        if (id) {
          // Si on a un ID spécifique, récupérer ce programme
          const response = await fetch(`https://progfit.onrender.com/api/programmes/${id}`);
          const data = await response.json();
          setProgramme(data.programme);
          
          // Récupérer aussi les séances terminées de l'utilisateur
          const token = localStorage.getItem('token');
          const seancesResponse = await fetch('https://progfit.onrender.com/api/user-programmes/actuel', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (seancesResponse.ok) {
            const seancesData = await seancesResponse.json();
            if (seancesData.programmeActuel && seancesData.programmeActuel.seancesTerminees) {
              const seancesTermineesIndex = seancesData.programmeActuel.seancesTerminees.map(s => s.seanceIndex);
              setSeancesTerminees(seancesTermineesIndex);
            }
          }
        } else {
          // Pas d'ID fourni, récupérer le programme actuel de l'utilisateur
          const token = localStorage.getItem('token');
          const programmeActuelResponse = await fetch('https://progfit.onrender.com/api/user-programmes/actuel', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (programmeActuelResponse.ok) {
            const programmeData = await programmeActuelResponse.json();
            if (programmeData.programmeActuel && programmeData.programmeActuel.programmeId) {
              setProgramme(programmeData.programmeActuel.programmeId);
              // Récupérer les séances terminées
              if (programmeData.programmeActuel.seancesTerminees) {
                const seancesTermineesIndex = programmeData.programmeActuel.seancesTerminees.map(s => s.seanceIndex);
                setSeancesTerminees(seancesTermineesIndex);
              }
            } else {
              setError('Aucun programme actuel trouvé. Veuillez choisir un programme depuis la page programmes.');
            }
          } else {
            setError('Erreur lors de la récupération du programme actuel.');
          }
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError('Erreur lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgramme();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <NavBar />
        <div className="flex-1 md:ml-64 p-8 flex justify-center items-center">
          <p className="text-black text-xl">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <NavBar />
        <div className="flex-1 md:ml-64 p-8 flex flex-col justify-center items-center">
          <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
            <div className="text-6xl mb-4">🏋️‍♂️</div>
            <h2 className="text-black text-2xl font-bold mb-4">Séance d'entraînement</h2>
            <p className="text-gray-600 mb-6">
              {error}
            </p>
            <button 
              onClick={() => navigate('/programs')}
              className="bg-[#E22807] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Choisir un programme
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
          <p className="text-black text-xl">Aucun programme trouvé.</p>
        </div>
      </div>
    );
  }
  return (
    <div className='min-h-screen bg-gray-50'>
      <NavBar/>
      <div className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8" 
        style={{ fontFamily: 'Poppins, sans-serif'}}>
          <p className='text-[#E22807] font-bold text-4xl'>Ma séance en cours</p>
          
          {/* Informations du programme */}
          <div className="border border-gray-300 rounded-xl p-8 mt-8 bg-white max-w-4xl flex flex-col gap-6 text-black font-bold text-2xl">
            <p>Programme <span className='text-[#E22807]'>{programme.nom}</span></p>
            <p>Durée : <span className='text-[#E22807]'>{programme.duree} semaines</span></p>
            <p>Difficulté : <span className='text-[#E22807]'>{programme.niveau}</span></p>
            <p>Objectif : <span className='text-[#E22807]'>{programme.objectif}</span></p>
            
            {/* Vérifier si toutes les séances sont terminées */}
            {programme.seances && seancesTerminees.length === programme.seances.length ? (
              <div className="flex flex-col gap-4">
                <p className="text-green-600 font-bold text-xl">🎉 Toutes les séances sont terminées ! 🎉</p>
                <div className="flex gap-4 flex-wrap">
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300 shadow-lg w-fit"
                    onClick={handleTerminerProgramme}
                  >
                    Terminer ce programme ✓
                  </button>
                  <button 
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300 shadow-lg w-fit"
                    onClick={handleAnnulerProgramme}
                  >
                    Annuler ce programme
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-gray-600 text-lg">
                  Progression : {seancesTerminees.length} / {programme.seances?.length || 0} séances terminées
                </p>
                <button 
                  className="bg-[#E22807] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300 shadow-lg w-fit"
                  onClick={handleAnnulerProgramme}
                >
                  Annuler ce programme
                </button>
              </div>
            )}
          </div>

          {/* Séances du programme */}
          {programme.seances && programme.seances.length > 0 && (
            <div className="mt-12">
              <h2 className="text-black text-3xl font-bold mb-8">Séances d'entraînement</h2>
              <div className="flex flex-col gap-8">
                {programme.seances.map((seance, index) => (
                  <div key={index} className="bg-white border border-gray-300 rounded-xl p-6 max-w-4xl">
                    {/* Header de la séance */}
                    <div className="mb-6">
                      <h3 className="text-[#E22807] font-bold text-2xl mb-2">
                        Jour {seance.jour} - {seance.nom}
                      </h3>
                      <p className="text-gray-600 text-lg mb-2">
                        <span className="font-semibold">Objectif:</span> {seance.objectif}
                      </p>
                      <p className="text-gray-600 text-lg">
                        <span className="font-semibold">Durée estimée:</span> {seance.dureeEstimee} min
                      </p>
                    </div>

                    {/* Exercices de la séance */}
                    {seance.exercices && seance.exercices.length > 0 ? (
                      <div className="space-y-4">
                        <h4 className="text-black font-bold text-xl mb-4">
                          Exercices ({seance.exercices.length})
                        </h4>
                        <div className="grid gap-4">
                          {seance.exercices.map((exercice, exIndex) => (
                            <div key={exIndex} className="bg-gray-50 rounded-lg p-4 border">
                              <h5 className="font-bold text-lg text-[#E22807] mb-2">
                                {exercice.nom}
                              </h5>
                              <div className="text-sm text-gray-700 space-y-1">
                                <p><span className="font-semibold">Séries:</span> {exercice.series}</p>
                                <p><span className="font-semibold">Répétitions:</span> {exercice.repetitions}</p>
                                {exercice.duree && (
                                  <p><span className="font-semibold">Durée:</span> {exercice.duree}s</p>
                                )}
                                <p><span className="font-semibold">Groupes musculaires:</span> {exercice.groupesMusculaires?.join(', ')}</p>
                                {exercice.description && (
                                  <p><span className="font-semibold">Description:</span> {exercice.description}</p>
                                )}
                                {exercice.instructions && exercice.instructions.length > 0 && (
                                  <div className="mt-3">
                                    <p className="font-semibold mb-2">Instructions:</p>
                                    <ul className="list-disc list-inside space-y-1 ml-2">
                                      {exercice.instructions.map((instruction, instIndex) => (
                                        <li key={instIndex} className="text-gray-600">
                                          {instruction}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">Aucun exercice pour cette séance</p>
                    )}

                    {/* Bouton Terminer séance */}
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => handleTerminerSeance(index)}
                        disabled={seancesTerminees.includes(index)}
                        className={`px-6 py-3 rounded-lg font-bold text-lg transition-colors duration-300 ${
                          seancesTerminees.includes(index)
                            ? 'bg-green-500 text-white cursor-not-allowed opacity-75'
                            : 'bg-[#E22807] hover:bg-red-700 text-white shadow-lg'
                        }`}
                      >
                        {seancesTerminees.includes(index) ? 'Séance terminée ✓' : 'Terminer séance'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
  )
}
