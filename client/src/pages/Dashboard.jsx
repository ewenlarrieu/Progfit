import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import profileIcon from '../../img/iconamoon_profile-fill.png'
import { API_URL } from '../config/api'

export default function Dashboard() {

  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [historique, setHistorique] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }

        const response = await fetch(`${API_URL}/api/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          localStorage.removeItem('token')
          navigate('/login')
          return
        }
        const data = await response.json()
        setUser(data.user)
      } catch (error) {
        navigate('/login')
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    const fetchHistorique = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return

        const response = await fetch(`${API_URL}/api/user-programmes/history`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          const sortedHistory = (data.histoique).sort((a, b) => 
            new Date(b.dateFin) - new Date(a.dateFin)
          )
          setHistorique(sortedHistory)
        }
      } catch (error) {
        console.error('Error fetching history:')
      }
    }

    fetchHistorique()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavBar/>

      <main 
        className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8 pt-20 md:pt-8 text-white" 
        style={{ fontFamily: 'Poppins, sans-serif'}}
      >
   
        <section className="bg-[#E22807] rounded-lg p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Bonjour {user?.nom}
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg">
            {user?.programmeActuel?.programme 
              ? `Vous suivez actuellement le programme : ${user?.programmeActuel?.programme.nom}`
              : "Aucun programme en cours vous pouvez commencer un nouveau programme en vous inscrivant sur la page programme"
            }
          </p>
        </section>

        
        <section className="flex flex-col md:flex-row gap-6 mt-6">
          <article className="bg-white rounded-lg p-4 sm:p-6 shadow flex-1">
            <div className="flex flex-col justify-between h-full">
              <header className="w-full">
                <h2 className="text-black text-center font-bold text-2xl md:text-3xl pb-6">
                  Programme actuel
                </h2>
                <div className="border-t-2 border-gray-200"></div>
              </header>
              
              <div className="w-full flex flex-col items-center justify-center flex-1">
                {user?.programmeActuel?.programme ? (
                  <div className="text-center">
                    <p className="text-[#E22807] font-semibold text-xl mb-2">
                      {user?.programmeActuel?.programme.nom}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Semaine {user?.programmeActuel?.semaineActuelle}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">
                    Aucun programme en cours
                  </p>
                )}
              </div>
              
              <div className="flex justify-center w-full">
                <button 
                  onClick={() => navigate('/programs')}
                  className="bg-[#E22807] hover:bg-[#c41c00] text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200"
                  aria-label={user?.programmeActuel ? 'Changer de programme' : 'Choisir un programme'}
                >
                  {user?.programmeActuel ? 'Changer de programme' : 'Choisir un programme'}
                </button>
              </div>
            </div>
          </article>

      
          <article className="bg-white rounded-lg p-4 sm:p-6 shadow flex-1">
            <div className="flex flex-col justify-between h-full">
              <div>
                <header>
                  <h2 className="text-black text-center font-bold text-2xl md:text-3xl pb-6">
                    Séances terminées
                  </h2>
                </header>
                {user?.programmeActuel ? (
                  <div className="text-center">
                    <p className="text-center font-semibold text-4xl text-[#E22807] pb-2">
                      {user.programmeActuel.seancesCompletees.length}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      cette semaine
                    </p>
                    <div className="border-t-2 border-gray-200 pt-3 mt-2">
                      <p className="text-2xl font-semibold text-gray-700">
                        {user.totalSeancesCompletees || 0}
                      </p>
                      <p className="text-gray-500 text-xs">
                        séances au total
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-500 mb-4">
                      Aucune séance cette semaine
                    </p>
                    <div className="border-t-2 border-gray-200 pt-3 mt-2">
                      <p className="text-2xl font-semibold text-gray-700">
                        {user?.totalSeancesCompletees || 0}
                      </p>
                      <p className="text-gray-500 text-xs">
                        séances au total
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-6">
                <button 
                  onClick={() => {
                    if (user?.programmeActuel?.programme?._id) {
                      navigate(`/seance-entrainement/${user.programmeActuel.programme._id}`);
                    }
                  }}
                  className="bg-[#E22807] hover:bg-[#c41c00] text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={user?.programmeActuel ? 'Voir les séances' : 'Pas de programme'}
                  disabled={!user?.programmeActuel}
                >
                  {user?.programmeActuel ? 'Voir les séances' : 'Pas de programme'}
                </button>
              </div>
            </div>
          </article>
        </section>


        <section className="mt-6">
          <article className="bg-white rounded-lg p-4 sm:p-6 shadow">
            <header>
              <h2 className="text-black text-center font-bold text-2xl md:text-3xl pb-6">
                Prochaine Séance
              </h2>
              <div className="border-t-2 border-gray-200 mb-4"></div>
            </header>
            
            {user?.programmeActuel?.programme ? (
              (() => {
                const prochaineSeance = user.programmeActuel.programme.seances.find(
                  seance => !user.programmeActuel.seancesCompletees.includes(seance.jour)
                )
                
                if (prochaineSeance) {
                  return (
                    <div className="text-center">
                      <p className="text-gray-600 text-sm mb-2">
                        Semaine {user.programmeActuel.semaineActuelle}
                      </p>
                      <p className="text-[#E22807] font-semibold text-2xl mb-3">
                        Jour {prochaineSeance.jour}
                      </p>
                      <ul className="max-w-2xl mx-auto">
                        {prochaineSeance.exercices.map((exercice, index) => (
                          <li key={index} className="bg-gray-50 rounded-lg p-3 mb-2">
                            <p className="font-semibold text-gray-800">{exercice.nom}</p>
                            <p className="text-sm text-gray-600">
                              {exercice.series} séries × {exercice.repetitions} répétitions
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                } else {
                  return (
                    <p className="text-center text-gray-500">
                      Toutes les séances de la semaine sont terminées ! Validez la semaine pour continuer.
                    </p>
                  )
                }
              })()
            ) : (
              <p className="text-center text-gray-500">
                Aucun programme actif
              </p>
            )}
          </article>
        </section>

      
        <section className="mt-6">
          <article className="bg-white rounded-lg p-4 sm:p-6 shadow">
            <header>
              <h2 className="text-black text-center font-bold text-2xl md:text-3xl pb-6">
                Historique des programmes
              </h2>
              <div className="border-t-2 border-gray-200 mb-4"></div>
            </header>
            
            {historique.length > 0 ? (
              <ul className="max-w-4xl mx-auto space-y-3">
                {historique.map((item, index) => (
                  <li key={index} className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="mb-2 sm:mb-0">
                      <p className="font-semibold text-gray-800 text-lg">
                        {item.programmeId?.nom}
                      </p>
                      <p className="text-sm text-gray-600">
                        Du {new Date(item.dateDebut).toLocaleDateString('fr-FR')} au {new Date(item.dateFin).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      {item.statut === 'termine' ? (
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                          Terminé
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                          Abandonné
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                Aucun programme terminé
              </p>
            )}
          </article>
        </section>

        
        <section className="flex mt-6">
          <article className="bg-white rounded-lg p-4 sm:p-6 shadow w-full max-w-3xl mx-auto flex flex-col items-center">
            <img src={profileIcon} alt="Icône de profil" className="w-20 h-20 sm:w-24 sm:h-24 mb-4" />
            <header>
              <h2 className="text-black text-center font-bold text-2xl md:text-3xl pb-6">
                {user?.nom}
              </h2>
            </header>

            <div className="border-b-2 border-black w-full mb-5"></div>
            <dl className="flex flex-col text-[#E22807] font-bold gap-3 text-base sm:text-lg">
              <div>
                <dt className="inline">Email : </dt>
                <dd className="inline text-black">{user?.email}</dd>
              </div>
              <div>
                <dt className="inline">Niveau : </dt>
                <dd className="inline text-black">{user?.niveau}</dd>
              </div>
              <div>
                <dt className="inline">Objectifs : </dt>
                <dd className="inline text-black">{user?.objectif}</dd>
              </div>
              <div>
                <dt className="inline">Programme en cours : </dt>
                <dd className="inline text-black">
                  {user?.programmeActuel?.programme?.nom || "Aucun programme en cours"}
                </dd>
              </div>
            </dl>
          </article>
        </section>

      </main>
    </div>
  )
}
