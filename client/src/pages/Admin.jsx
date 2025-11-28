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
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmes.map((programme) => (
              <article key={programme._id} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-[#E22807] mb-2">
                  {programme.nom}
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">Difficulté:</span> {programme.difficulte}</p>
                  <p><span className="font-semibold">Objectif:</span> {programme.objectif}</p>
                  <p><span className="font-semibold">Durée:</span> {programme.duree} semaines</p>
                  <p><span className="font-semibold">Séances:</span> {programme.seances?.length}</p>
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
