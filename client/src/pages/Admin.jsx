import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { API_URL } from '../config/api'

export default function Admin() {
  const navigate = useNavigate()
  const [programmes, setProgrammes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }

        const response = await fetch(`${API_URL}/api/programmes`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Data received:', data)
          setProgrammes(Array.isArray(data) ? data : data.programmes)
        } else {
          console.error('Erreur lors de la récupération des programmes')
        }
      } catch (error) {
        console.error('Error fetching programmes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgrammes()
  }, [])

  const handleDelete = async (programmeId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/api/programmes/${programmeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setProgrammes(programmes.filter(p => p._id !== programmeId))
        alert('Programme supprimé avec succès')
      } else {
        alert('Erreur lors de la suppression du programme')
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du programme', error)
      alert('Erreur lors de la suppression du programme')
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <NavBar/>
      <main 
        className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8 pt-20 md:pt-8"
        style={{ fontFamily: 'Poppins, sans-serif'}}
      >
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Administration des programmes</h1>
        </header>

        {loading ? (
          <p className="text-center text-gray-600">Chargement...</p>
        ) : programmes.length > 0 ? (
          <section className="space-y-8">
            {programmes.map((programme) => (
              <article key={programme._id} className="bg-white rounded-lg shadow-lg p-6">
              
                <header className="border-b-2 border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-bold text-[#E22807]">
                      {programme.nom}
                    </h2>
                    <button
                      onClick={() => handleDelete(programme._id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Supprimer
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4">{programme.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Difficulté: </span>
                      <span className="text-gray-600">{programme.difficulte}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Objectif: </span>
                      <span className="text-gray-600">{programme.objectif}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Durée: </span>
                      <span className="text-gray-600">{programme.duree} semaines</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Séances: </span>
                      <span className="text-gray-600">{programme.seances?.length}</span>
                    </div>
                  </div>
                </header>

                
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Séances du programme</h3>
                  <div className="space-y-4">
                    {programme.seances?.map((seance, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-bold text-[#E22807]">
                            Jour {seance.jour} - {seance.nom}
                          </h4>
                          <span className="text-sm text-gray-600">
                            Durée estimée: {seance.dureeEstimee} min
                          </span>
                        </div>
                        
                        
                        <div className="space-y-2">
                          {seance.exercices?.map((exercice, exIndex) => (
                            <div key={exIndex} className="bg-white rounded p-3 border border-gray-200">
                              <p className="font-semibold text-gray-800">{exercice.nom}</p>
                              <p className="text-sm text-gray-600 mb-2">{exercice.description}</p>
                              <div className="flex flex-wrap gap-4 text-xs text-gray-700">
                                <span><strong>Séries:</strong> {exercice.series}</span>
                                <span><strong>Répétitions:</strong> {exercice.repetitions}</span>
                                <span><strong>Repos:</strong> {exercice.repos}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <p className="text-center text-gray-600">Aucun programme disponible</p>
        )}
      </main>
    </div>
  )
}
