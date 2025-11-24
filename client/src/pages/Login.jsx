import React, { useState } from 'react'
import Logo from '../components/Logo'
import profileIcon from '../../img/iconamoon_profile-fill.png'
import backgroundImage from '../../img/unsplash_j8fVoo3i8xk.png'
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

      localStorage.setItem('token', data.token)
      navigate('/dashboard')

    } catch (err) {
      setError(err.message)
    }
  }

  return (
      <div className="min-h-screen relative">
        <div 
          className="fixed inset-0  bg-cover"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 "></div>
        </div>
        
        {/* Bouton retour */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 text-white flex items-center gap-2 font-semibold bg-black/30 hover:bg-black/50 px-3 py-2 rounded-full backdrop-blur-sm"
        >
          <span>Retour</span>
        </button>

        <div className="absolute inset-0 flex items-center justify-center z-20 px-4 py-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-3xl w-full text-center">
            <Logo />
            <h1 className="font-bold text-black mt-5 sm:mt-7 text-2xl sm:text-3xl tracking-widest">Connectez-vous</h1>
  
            <div className="w-24 h-24 sm:w-30 sm:h-30 rounded-full mx-auto mt-4 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[#FF7D66] opacity-60 rounded-full"></div>
              <img src={profileIcon} alt="Profile icon" className="w-12 h-12 sm:w-16 sm:h-16 relative z-10" />
            </div>
  
            <form onSubmit={handleLogin} className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <label htmlFor="email" className='text-black font-semibold tracking-widest text-lg sm:text-[22px] mb-2 text-left block'>Email</label>
                  <input 
                    id="email"
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-1 border-black rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 w-full placeholder-[#3A3A3A] text-black text-base sm:text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#E22807] focus:border-[#E22807] transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <label htmlFor="password" className='text-black font-semibold tracking-widest text-lg sm:text-[22px] mb-2 text-left block'>Mot de passe</label>
                  <input 
                    id="password"
                    type="password" 
                    placeholder="Mot de passe" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-1 border-black rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 w-full placeholder-[#3A3A3A] text-black text-base sm:text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#E22807] focus:border-[#E22807] transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 px-4 py-3 rounded max-w-sm mx-auto">
                  <p className="text-red-700 text-base">{error}</p>
                </div>
              )}

              <button 
                type="submit"
                className="w-full sm:w-auto px-8 sm:px-10 py-2.5 bg-gradient-to-r from-[#E22807] to-[#c41e06] text-white rounded-full font-bold text-lg sm:text-[22px] transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-2xl active:scale-95 shadow-lg focus:outline-none focus:ring-4 focus:ring-[#E22807]/50 border-2 border-[#E22807]/20"
              >
                Continuer
              </button>
            </form>

            <div className='mt-6 sm:mt-8 text-center'>
              <p className='text-base sm:text-[18px] text-gray-700 font-medium mb-4 sm:mb-5'>Vous n'avez pas de compte ?</p>
              <button 
                className="w-full sm:w-auto px-8 sm:px-10 py-2.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full font-bold text-lg sm:text-[22px] transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-2xl active:scale-95 shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-900/50 border-2 border-gray-700/30"
                onClick={() => navigate('/register')}
              >
                Créer un compte
              </button>
            </div>
  
          </div>
         
        </div>
      </div>
    )
   
}
