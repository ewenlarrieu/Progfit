import React, { useState } from 'react'
import Logo from '../components/common/Logo'
import profileIcon from '/assets/img/iconamoon_profile-fill.png'
import { useNavigate } from 'react-router-dom'


export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('https://progfit.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'envoi de l\'email')
      }

      setMessage(data.message || 'Si cet email existe, un lien de réinitialisation a été envoyé.')
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
              backgroundImage: 'url(/assets/img/unsplash_j8fVoo3i8xk.png)',
            }}
          ></div>
          
          {/* Image principale nette avec object-contain */}
          
          
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full mx-4 text-center">
              <Logo/>
              <p className="font-bold text-black mt-7 text-3xl tracking-widest" style={{fontFamily: 'Poppins, sans-serif'}}>Mot de passe oublier</p>
    
              <div className="w-30 h-30 rounded-full mx-auto mt-4 flex items-center justify-center relative">
                {/* Fond orange avec opacité */}
                <div className="absolute inset-0 bg-[#FF7D66] opacity-61 rounded-full"></div>
                {/* Icône sans opacité */}
                <img src={profileIcon} alt="Profile icon" className="w-16 h-16 relative z-10" />
              </div>
    
    
              <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
                {/* Email */}
                <div className="flex justify-center">
                  <div className="w-full max-w-sm">
                    <p className='text-black font-medium tracking-widest text-[22px] mb-2 text-left' style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '10%'}}>Email</p>
                    <input 
                      type="email" 
                      placeholder="Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    disabled={isLoading}
                    className="px-13 py-1.5 bg-[#E22807] text-white rounded-4xl font-semibold text-[28px] transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed" 
                    style={{fontFamily: 'Poppins, sans-serif',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {isLoading ? 'Envoi...' : 'Continuer'}
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
