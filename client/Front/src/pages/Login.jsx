import React, { useState } from 'react'
import Logo from '../components/common/Logo'
import profileIcon from '/assets/img/iconamoon_profile-fill.png'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('https://progfit.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la connexion')
      }

      // Stocker le token JWT
      localStorage.setItem('token', data.token)

      // Rediriger vers le tableau de bord 
      navigate('/dashboard')
    } catch (err) {
      // Gérer les erreurs
      setError(err.message)
    }
  }

  return (
      <div className="min-h-screen relative">
        {/* Image d'arrière-plan floue pour remplir les espaces */}
        <div 
          className="h-screen bg-cover"
          style={{
            backgroundImage: 'url(/assets/img/unsplash_j8fVoo3i8xk.png)',
          }}
        ></div>
        
        {/* Image principale nette avec object-contain */}
        
        
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full mx-4 text-center responsive-login-card">
            <Logo />
            <p className="font-bold text-black mt-7 text-3xl tracking-widest responsive-login-title" style={{ fontFamily: 'Poppins, sans-serif' }}>Connectez-vous</p>
  
            <div className="w-30 h-30 rounded-full mx-auto mt-4 flex items-center justify-center relative responsive-icon">
              <div className="absolute inset-0 bg-[#FF7D66] opacity-61 rounded-full"></div>
              <img src={profileIcon} alt="Profile icon" className="w-16 h-16 relative z-10" />
            </div>
  
            <form onSubmit={handleLogin} className="mt-8 space-y-6">
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <p className='text-black font-medium tracking-widest text-[22px] mb-2 text-left responsive-login-input' style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '10%' }}>Email</p>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-black rounded-3xl p-2 w-full block placeholder-[#3A3A3A] text-black text-lg responsive-login-input" 
                    style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <p className='text-black font-medium tracking-widest text-[22px] mb-2 text-left responsive-login-input' style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '10%' }}>Mot de passe</p>
                  <input 
                    type="password" 
                    placeholder="Mot de passe" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-black rounded-3xl p-2 w-full block placeholder-[#3A3A3A] text-black text-lg responsive-login-input" 
                    style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-2xl mt-2">{error}</p>}

              <button 
                type="submit"
                className="px-13 py-1.5 bg-[#E22807] text-white rounded-4xl font-semibold text-[28px] transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 responsive-login-button" 
                style={{ fontFamily: 'Poppins, sans-serif', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
              >
                Continuer
              </button>
            </form>

            <div className='mt-6 text-center'>
              <button 
                className='text-[18px] text-black font-medium underline transition-transform duration-150 ease-in-out hover:scale-105 inline-block responsive-login-button' 
                style={{ fontFamily: 'Poppins, sans-serif' }}
                onClick={() => navigate('/ForgotPassword')}
              >
                Mot de passe oublier
              </button>
            </div>

            <div className='mt-6 text-center'>
              <p className='text-[18px] text-black font-medium' style={{ fontFamily: 'Poppins, sans-serif' }}>Vous n'avez pas de compte ?</p>
              <button 
                className=" mt-5 px-13 py-1.5 bg-black text-white rounded-4xl font-semibold text-[28px] transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7D66]" 
                style={{ fontFamily: 'Poppins, sans-serif', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
                onClick={() => navigate('/register')}
              >
                Crée un compte
              </button>
            </div>
  
          </div>
         
        </div>
      </div>
    )
   
}
