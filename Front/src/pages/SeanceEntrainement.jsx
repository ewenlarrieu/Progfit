import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { API_URL } from '../config/api'

export default function SeanceEntrainement() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [programmeData, setProgrammeData] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
  }, [navigate])

  const fetchProgrammeActuel = async () => {
    try {
      const token = localStorage.getItem('token')
      
      if (id) {
        const response = await fetch(`${API_URL}/api/programmes/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          const userResponse = await fetch(`${API_URL}/api/user-programmes/current`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (userResponse.ok) {
            const userData = await userResponse.json()
            setProgrammeData({
              programme: data.programme,
              semaineActuelle: userData.programmeActuel?.semaineActuelle,
              seancesCompletees: userData.programmeActuel?.seancesCompletees 
            })
          }
        }
      } else {
        const response = await fetch(`${API_URL}/api/user-programmes/current`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          if (data.programmeActuel) {
            setProgrammeData({
              programme: data.programmeActuel.programme,
              semaineActuelle: data.programmeActuel.semaineActuelle,
              seancesCompletees: data.programmeActuel.seancesCompletees
            })
          }
        }
      }
    } catch (error) {
      // Erreur silencieuse
    }
  }

  const handleUnsubscribe = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/api/user-programmes/unsubscribe`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        alert('Vous avez été désinscrit du programme')
        navigate('/dashboard')
      } else {
        const error = await response.json()
        alert(error.message)
      }
    } catch (error) {
      alert('Erreur lors de la désinscription')
    }
  }

  const handleCompleteSeance = async (jour) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/api/user-programmes/complete-seance`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jour })
      })

      if (response.ok) {
        const data = await response.json()
        alert(data.message)
        await fetchProgrammeActuel()
      } else {
        const error = await response.json()
        alert(error.message)
      }
    } catch (error) {
      alert('Erreur lors de la validation de la séance')
    }
  }

  const handleValidateWeek = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/api/user-programmes/validate-week`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.programmeCompleted) {
          alert(data.message)
          navigate('/dashboard')
        } else {
          alert(data.message)
          await fetchProgrammeActuel()
        }
      } else {
        const error = await response.json()
        alert(error.message)
      }
    } catch (error) {
      alert('Erreur lors de la validation de la semaine')
    }
  }

  useEffect(() => {
    fetchProgrammeActuel()
  }, [id])

  return (
    <main className='min-h-screen bg-gray-50'>
      <nav>
      <NavBar/>

      </nav>
      <section className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8" 
        style={{ fontFamily: 'Poppins, sans-serif'}}>
          <h1 className='text-[#E22807] font-bold text-4xl'>Ma séance en cours</h1>
          
          {!programmeData && (
            <article className="mt-8 bg-white border border-gray-300 rounded-xl p-8 max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Aucun programme actif</h2>
              <p className="text-gray-600 mb-6">
                Vous n'avez pas encore choisi de programme d'entraînement. Veuillez sélectionner un programme pour commencer vos séances.
              </p>
              <button
                onClick={() => navigate('/programs')}
                className="bg-[#E22807] hover:bg-[#c41c00] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                aria-label="Voir les programmes disponibles"
              >
                Voir les programmes
              </button>
            </article>
          )}
          
          {programmeData && (
            <>
            
              <article className="border border-gray-300 rounded-xl p-8 mt-8 bg-white max-w-4xl flex flex-col gap-6 text-black font-bold text-2xl">
                <h2 className="sr-only">Informations du programme</h2>
                <p>Programme <span className='text-[#E22807]'>{programmeData.programme.nom}</span></p>
                <p>Semaine actuelle : <span className='text-[#E22807]'>{programmeData.semaineActuelle} / {programmeData.programme.duree}</span></p>
                <p>Durée : <span className='text-[#E22807]'>{programmeData.programme.duree} semaines</span></p>
                <p>Difficulté : <span className='text-[#E22807]'>{programmeData.programme.difficulte}</span></p>
                <p>Objectif : <span className='text-[#E22807]'>{programmeData.programme.objectif}</span></p>
                
          
                <div className="flex flex-col gap-4">
                  <p className="text-gray-600 text-lg">
                    Progression : {programmeData.seancesCompletees.length} / {programmeData.programme.seances.length} séances terminées
                  </p>
                  <nav className="flex gap-4 flex-wrap" aria-label="Actions du programme">
                    {programmeData.seancesCompletees.length === programmeData.programme.seances.length && (
                      <button 
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300 shadow-lg w-fit"
                        onClick={handleValidateWeek}
                        aria-label="Terminer la semaine et passer à la suivante"
                      >
                        Terminer la semaine ✓
                      </button>
                    )}
                    <button 
                      className="bg-[#E22807] hover:bg-[#c41c00] text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300 shadow-lg w-fit"
                      onClick={handleUnsubscribe}
                      aria-label="Se désinscrire du programme actuel"
                    >
                      Annuler ce programme
                    </button>
                  </nav>
                </div>
              </article>
            </>
          )}

          
          {programmeData && programmeData.programme.seances && (
            <section className="mt-12">
              <h2 className="text-black text-3xl font-bold mb-8">Séances d'entraînement</h2>
              <ul className="flex flex-col gap-8">
                {programmeData.programme.seances.map((seance, index) => {
                  const isCompleted = programmeData.seancesCompletees?.includes(seance.jour)
                  const seancePrecedente = index > 0 ? programmeData.programme.seances[index - 1] : null
                  const canComplete = index === 0 || (seancePrecedente && programmeData.seancesCompletees?.includes(seancePrecedente.jour))
                  
                  return (
                  <li key={index} className="bg-white border border-gray-300 rounded-xl p-6 max-w-4xl">
                 
                    <header className="mb-6">
                      <h3 className="text-[#E22807] font-bold text-2xl mb-2">
                        Jour {seance.jour} - {seance.nom}
                      </h3>
                      <p className="text-gray-600 text-lg mb-2">
                        <span className="font-semibold">Durée estimée:</span> {seance.dureeEstimee} minutes
                      </p>
                      <p className="text-gray-600 text-lg">
                        <span className="font-semibold">Nombre d'exercices:</span> {seance.exercices?.length}
                      </p>
                    </header>

                  
                    {seance.exercices && seance.exercices.length > 0 && (
                      <section className="space-y-4 mb-6">
                        <h4 className="text-black font-bold text-xl mb-4">Exercices</h4>
                        <ul className="grid gap-4">
                          {seance.exercices.map((exercice, exIndex) => (
                            <li key={exIndex} className="bg-gray-50 rounded-lg p-4 border">
                              <h5 className="font-bold text-lg text-[#E22807] mb-2">
                                {exercice.nom}
                              </h5>
                              <dl className="text-sm text-gray-700 space-y-1">
                                <div><dt className="inline font-semibold">Séries:</dt> <dd className="inline">{exercice.series}</dd></div>
                                <div><dt className="inline font-semibold">Répétitions:</dt> <dd className="inline">{exercice.repetitions}</dd></div>
                                <div><dt className="inline font-semibold">Repos:</dt> <dd className="inline">{exercice.repos} secondes</dd></div>
                                {exercice.poids && (
                                  <div><dt className="inline font-semibold">Poids:</dt> <dd className="inline">{exercice.poids}</dd></div>
                                )}
                                {exercice.description && (
                                  <div className="mt-2">
                                    <dt className="font-semibold">Description:</dt>
                                    <dd className="text-gray-600 italic">{exercice.description}</dd>
                                  </div>
                                )}
                              </dl>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                   
                    <footer className="mt-6 flex justify-center">
                      {isCompleted ? (
                        <div className='bg-gray-400 text-white px-6 py-3 rounded-lg font-bold text-lg' role="status" aria-label="Séance terminée">
                          ✓ Séance terminée
                        </div>
                      ) : (
                        <button
                          onClick={() => handleCompleteSeance(seance.jour)}
                          disabled={!canComplete}
                          className={`px-6 py-3 rounded-lg font-bold text-lg transition-colors duration-300 ${
                            !canComplete
                              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                              : 'bg-green-600 hover:bg-green-700 text-white'
                          }`}
                          aria-label={!canComplete ? 'Terminer la séance précédente d\'abord' : `Marquer la séance ${seance.nom} comme terminée`}
                        >
                          Terminer la séance
                        </button>
                      )}
                    </footer>
                  </li>
                  )
                })}
              </ul>
            </section>
          )}
        </section>
      </main>
  )
}
