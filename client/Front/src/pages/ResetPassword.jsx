import React, { useState, useEffect } from 'react'
import Logo from '../components/common/Logo'
import profileIcon from '/assets/img/iconamoon_profile-fill.png'
import backgroundImage from '/assets/img/unsplash_j8fVoo3i8xk.png'
import { useNavigate, useParams } from 'react-router-dom'


export default function ResetPassword() {
  const navigate = useNavigate()
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Vérifier si le token est présent
    if (!token) {
      setError('Token de réinitialisation manquant')
      return
    }
  }, [token])

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setIsLoading(true)

    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`https://progfit.onrender.com/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirmPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la réinitialisation du mot de passe')
      }

      setMessage('Mot de passe réinitialisé avec succès ! Redirection vers la page de connexion...')
      
      // Rediriger vers la page de connexion après 2 secondes
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
        <div className="min-h-screen relative">
          {/* Image d'arrière-plan floue pour remplir les espaces */}
          <div 
            className="absolute inset-0 w-full h-screen opacity-80 blur-sm bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          ></div>
          
          {/* Image principale nette avec object-contain */}
          
          
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full mx-4 text-center">
              <Logo/>
              <p className="font-bold text-black mt-7 text-3xl tracking-widest" style={{fontFamily: 'Poppins, sans-serif'}}>Réinitialiser le mot de passe</p>
    
              <div className="w-30 h-30 rounded-full mx-auto mt-4 flex items-center justify-center relative">
                {/* Fond orange avec opacité */}
                <div className="absolute inset-0 bg-[#FF7D66] opacity-61 rounded-full"></div>
                {/* Icône sans opacité */}
                <img src={profileIcon} alt="Profile icon" className="w-16 h-16 relative z-10" />
              </div>
    
    
              <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
                <div className="flex flex-col items-center space-y-6">
                  <div className="w-full max-w-sm">
                    <p className='text-black font-medium tracking-widest text-[18px] mb-2 text-left' style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '10%'}}>Entrez votre nouveau mot de passe</p>
                    <input 
                      type="password" 
                      placeholder="Nouveau mot de passe" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border border-black rounded-3xl p-2 w-full block placeholder-[#5A5A5A] text-black" 
                      style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
                    />
                  </div>
                  <div className="w-full max-w-sm">
                    <p className='text-black font-medium tracking-widest text-[16px] mb-2 text-left' style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '10%'}}>Confirmez votre nouveau mot de passe</p>
                    <input 
                      type="password" 
                      placeholder="Confirmez votre nouveau mot de passe" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="border border-black rounded-3xl p-2 w-full block placeholder-[#5A5A5A] text-black" 
                      style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {message && <p className="text-green-600 text-sm mt-2">{message}</p>}

                {/* Bouton Continuer */}
                <div className="mt-10 text-center">
                  <button 
                    type="submit"
                    disabled={isLoading || !token}
                    className="px-13 py-1.5 bg-[#E22807] text-white rounded-4xl font-semibold text-[28px] transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed" 
                    style={{fontFamily: 'Poppins, sans-serif',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {isLoading ? 'Réinitialisation...' : 'Réinitialiser'}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 text-center ">
               <button className='text-2xl text-black underline transition-transform duration-150 ease-in-out hover:scale-105 inline-block'
               style={{fontFamily: 'Poppins, sans-serif'}}
               onClick={()=> navigate('/login')}>Retour</button>
              </div>
    
            </div>
           
          </div>
        </div>
      )
}
