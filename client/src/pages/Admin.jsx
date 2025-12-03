import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { API_URL } from '../config/api'

export default function Admin() {
  const navigate = useNavigate()
  const [programmes, setProgrammes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    difficulte: 'Débutant',
    objectif: 'perte de poids',
    duree: 1,
    seances: []
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const fetchProgrammes = async () => {
      try {
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

  const addSeance = () => {
    setFormData({
      ...formData,
      seances: [...formData.seances, {
        jour: formData.seances.length + 1,
        nom: '',
        dureeEstimee: 30,
        exercices: []
      }]
    })
  }

  const removeSeance = (index) => {
    const newSeances = formData.seances.filter((_, i) => i !== index)
    setFormData({ ...formData, seances: newSeances })
  }

  const updateSeance = (index, field, value) => {
    const newSeances = [...formData.seances]
    newSeances[index][field] = value
    setFormData({ ...formData, seances: newSeances })
  }

  const addExercice = (seanceIndex) => {
    const newSeances = [...formData.seances]
    newSeances[seanceIndex].exercices.push({
      nom: '',
      description: '',
      series: 3,
      repetitions: '10',
      repos: '60s'
    })
    setFormData({ ...formData, seances: newSeances })
  }

  const removeExercice = (seanceIndex, exerciceIndex) => {
    const newSeances = [...formData.seances]
    newSeances[seanceIndex].exercices = newSeances[seanceIndex].exercices.filter((_, i) => i !== exerciceIndex)
    setFormData({ ...formData, seances: newSeances })
  }

  const updateExercice = (seanceIndex, exerciceIndex, field, value) => {
    const newSeances = [...formData.seances]
    newSeances[seanceIndex].exercices[exerciceIndex][field] = value
    setFormData({ ...formData, seances: newSeances })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.nom || !formData.description || formData.seances.length === 0) {
      alert('Veuillez remplir tous les champs obligatoires et ajouter au moins une séance')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/api/programmes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setProgrammes([...programmes, data.programme])
        setShowForm(false)
        setFormData({
          nom: '',
          description: '',
          difficulte: 'Débutant',
          objectif: 'perte de poids',
          duree: 1,
          seances: []
        })
        alert('Programme créé avec succès')
      } else {
        const error = await response.json()
        alert(`Erreur: ${error.message}`)
      }
    } catch (error) {
      console.error('Erreur lors de la création du programme', error)
      alert('Erreur lors de la création du programme')
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
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Programmes Admin</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#E22807] hover:bg-[#c41c00] text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              {showForm ? 'Annuler' : 'Créer un programme'}
            </button>
          </div>
        </header>

        {showForm && (
          <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-[#E22807] mb-6">Nouveau programme</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informations de base */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nom du programme *</label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Durée (semaines) *</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.duree}
                    onChange={(e) => setFormData({...formData, duree: parseInt(e.target.value)})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Difficulté *</label>
                  <select
                    value={formData.difficulte}
                    onChange={(e) => setFormData({...formData, difficulte: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
                  >
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Objectif *</label>
                  <select
                    value={formData.objectif}
                    onChange={(e) => setFormData({...formData, objectif: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
                  >
                    <option value="perte de poids">Perte de poids</option>
                    <option value="prise de masse">Prise de masse</option>
                    <option value="entretien">Entretien</option>
                    <option value="force">Force</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
                  rows="3"
                  required
                />
              </div>

              {/* Séances */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Séances</h3>
                  <button
                    type="button"
                    onClick={addSeance}
                    className="bg-[#E22807] text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    + Ajouter une séance
                  </button>
                </div>

                {formData.seances.map((seance, seanceIndex) => (
                  <div key={seanceIndex} className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-[#E22807]">Séance {seanceIndex + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeSeance(seanceIndex)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded"
                      >
                        Supprimer
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Jour</label>
                        <input
                          type="number"
                          min="1"
                          value={seance.jour}
                          onChange={(e) => updateSeance(seanceIndex, 'jour', parseInt(e.target.value))}
                          className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Nom de la séance</label>
                        <input
                          type="text"
                          value={seance.nom}
                          onChange={(e) => updateSeance(seanceIndex, 'nom', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Durée estimée (min)</label>
                        <input
                          type="number"
                          min="1"
                          value={seance.dureeEstimee}
                          onChange={(e) => updateSeance(seanceIndex, 'dureeEstimee', parseInt(e.target.value))}
                          className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
                        />
                      </div>
                    </div>

                    {/* Exercices */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-semibold text-gray-800">Exercices</h5>
                        <button
                          type="button"
                          onClick={() => addExercice(seanceIndex)}
                          className="bg-[#E22807]  text-white font-semibold py-1 px-3 rounded text-sm"
                        >
                          + Ajouter un exercice
                        </button>
                      </div>

                      {seance.exercices.map((exercice, exerciceIndex) => (
                        <div key={exerciceIndex} className="bg-white rounded p-3 mb-3 border border-gray-200">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-sm">Exercice {exerciceIndex + 1}</span>
                            <button
                              type="button"
                              onClick={() => removeExercice(seanceIndex, exerciceIndex)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Supprimer
                            </button>
                          </div>

                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="Nom de l'exercice"
                              value={exercice.nom}
                              onChange={(e) => updateExercice(seanceIndex, exerciceIndex, 'nom', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-800"
                            />

                            <textarea
                              placeholder="Description"
                              value={exercice.description}
                              onChange={(e) => updateExercice(seanceIndex, exerciceIndex, 'description', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-800"
                              rows="2"
                            />

                            <div className="grid grid-cols-3 gap-2">
                              <input
                                type="number"
                                placeholder="Séries"
                                min="1"
                                value={exercice.series}
                                onChange={(e) => updateExercice(seanceIndex, exerciceIndex, 'series', parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-800"
                              />

                              <input
                                type="text"
                                placeholder="Répétitions"
                                value={exercice.repetitions}
                                onChange={(e) => updateExercice(seanceIndex, exerciceIndex, 'repetitions', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-800"
                              />

                              <input
                                type="text"
                                placeholder="Repos (ex: 60s)"
                                value={exercice.repos}
                                onChange={(e) => updateExercice(seanceIndex, exerciceIndex, 'repos', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-800"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-[#E22807] hover:bg-[#c41c00] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Créer le programme
              </button>
            </form>
          </section>
        )}

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
