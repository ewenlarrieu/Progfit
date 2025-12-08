import React, { useState } from 'react'
import Logo from '../components/Logo'
import profileIcon from '../../img/iconamoon_profile-fill.png'
import backgroundImage from '../../img/unsplash_j8fVoo3i8xk.png'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config/api';



export default function Register() {
  const navigate = useNavigate()
  
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [niveau, setNiveau] = useState('')
  const [objectif, setObjectif] = useState('')
  const [acceptPolitique, setAcceptPolitique] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault() 
    setError('') 

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: pseudo,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          niveau: niveau,
          objectif: objectif
        })
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      navigate('/login')
      
    } catch (error) {
      setError(error.message || 'Erreur lors de l\'inscription. Veuillez réessayer.')
    }
  }

  return (
    <main className='min-h-screen relative'>
      
      <div 
        className='fixed inset-0 bg-cover '
        style={{ backgroundImage: `url(${backgroundImage})` }}
        role="presentation"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      
      <nav className="absolute top-4 left-4 z-30">
        <button
          onClick={() => navigate('/')}
          className="text-white font-semibold bg-black/30 hover:bg-black/50 px-3 py-2 rounded-full transition-colors flex items-center gap-2"
          aria-label="Retour à la page d'accueil"
        >
          Retour
        </button>
      </nav>

  
      <section className="absolute inset-0 flex items-center justify-center z-20 px-4 py-4 sm:py-8" aria-labelledby="register-title">
        <article className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
          
      
          <header className='text-center'>
            <Logo />
            <h1 id="register-title" className="font-bold text-black mt-2 sm:mt-5 md:mt-7 text-xl sm:text-2xl md:text-3xl tracking-widest">
              Créer un compte
            </h1>
          </header>

          
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mt-2 sm:mt-4 flex items-center justify-center relative" role="img" aria-label="Icône de profil utilisateur">
            <div className="absolute inset-0 bg-[#FF7D66] opacity-60 rounded-full"></div>
            <img src={profileIcon} alt="" className="w-10 h-10 sm:w-12 sm:h-12 relative z-10" aria-hidden="true" />
          </div>

          
          <form onSubmit={handleSubmit} className="mt-3 sm:mt-6 md:mt-8 space-y-3 sm:space-y-4 md:space-y-5" aria-label="Formulaire d'inscription">
            <fieldset>
              <legend className="sr-only">Informations d'inscription</legend>

        
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-5">
                <div>
                  <label htmlFor="pseudo" className='text-black font-semibold tracking-widest text-base sm:text-lg md:text-xl mb-1 sm:mb-2 block'>
                    Pseudo
                  </label>
                  <input 
                    id="pseudo"
                    type="text" 
                    placeholder="Votre pseudo" 
                    value={pseudo}
                    onChange={(e) => { setPseudo(e.target.value); setError(''); }}
                    required
                    autoComplete="username"
                    className="border-2 border-black rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 w-full placeholder-[#3A3A3A] text-black text-sm sm:text-base md:text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#E22807] focus:border-[#E22807] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className='text-black font-semibold tracking-widest text-base sm:text-lg md:text-xl mb-1 sm:mb-2 block'>
                    Email
                  </label>
                  <input 
                    id="email"
                    type="email" 
                    placeholder="votre@email.com" 
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    required
                    autoComplete="email"
                    className="border-2 border-black rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 w-full placeholder-[#3A3A3A] text-black text-sm sm:text-base md:text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#E22807] focus:border-[#E22807] transition-all"
                  />
                </div>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4 md:mb-5">
                <div>
                  <label htmlFor="password" className='text-black font-semibold tracking-widest text-base sm:text-lg md:text-xl mb-1 sm:mb-2 block'>
                    Mot de passe
                  </label>
                  <input 
                    id="password"
                    type="password" 
                    placeholder="Mot de passe" 
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    required
                    autoComplete="new-password"
                    className="border-2 border-black rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 w-full placeholder-[#3A3A3A] text-black text-sm sm:text-base md:text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#E22807] focus:border-[#E22807] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className='text-black font-semibold tracking-widest text-base sm:text-lg md:text-xl mb-1 sm:mb-2 block'>
                    Confirmer mot de passe
                  </label>
                  <input 
                    id="confirmPassword"
                    type="password" 
                    placeholder="Confirmer votre mot de passe" 
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                    required
                    autoComplete="new-password"
                    className="border-2 border-black rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 w-full placeholder-[#3A3A3A] text-black text-sm sm:text-base md:text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#E22807] focus:border-[#E22807] transition-all"
                  />
                </div>
              </div>

             
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="niveau" className='text-black font-semibold tracking-widest text-base sm:text-lg md:text-xl mb-1 sm:mb-2 block'>
                    Niveau
                  </label>
                  <select 
                    id="niveau"
                    value={niveau}
                    onChange={(e) => { setNiveau(e.target.value); setError(''); }}
                    required
                    className="border-2 border-black rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 w-full text-black text-sm sm:text-base md:text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#E22807] focus:border-[#E22807] transition-all bg-white"
                  >
                    <option value="">Sélectionner un niveau</option>
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="avance">Avancé</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="objectif" className='text-black font-semibold tracking-widest text-base sm:text-lg md:text-xl mb-1 sm:mb-2 block'>
                    Objectif
                  </label>
                  <select 
                    id="objectif"
                    value={objectif}
                    onChange={(e) => { setObjectif(e.target.value); setError(''); }}
                    required
                    className="border-2 border-black rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 w-full text-black text-sm sm:text-base md:text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#E22807] focus:border-[#E22807] transition-all bg-white"
                  >
                    <option value="">Sélectionner un objectif</option>
                    <option value="perte de poids">Perte de poids</option>
                    <option value="prise de masse">Prise de masse</option>
                    <option value="entretien">Entretien</option>
                    <option value="force">Force</option>
                  </select>
                </div>
              </div>
            </fieldset>

            
            <div className="flex justify-center gap-3 px-2">
              <input
                type="checkbox"
                id="acceptPolitique"
                checked={acceptPolitique}
                onChange={(e) => setAcceptPolitique(e.target.checked)}
                required
                className="mt-1 w-4 h-4 text-[#E22807] bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#E22807] cursor-pointer"
              />
              <label htmlFor="acceptPolitique" className="text-sm sm:text-base text-gray-700 cursor-pointer">
                J'accepte la{' '}
                <a 
                  href="/politique-confidentialite" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E22807] font-semibold underline hover:text-[#c41c00] transition-colors"
                >
                  politique de confidentialité
                </a>
              </label>
            </div>

         
            {error && (
              <div 
                className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-2xl text-center font-semibold"
                role="alert"
              >
                {error}
              </div>
            )}

           
            <div className="text-center pt-2 sm:pt-4">
              <button 
                type="submit"
                className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 bg-gradient-to-r from-[#E22807] to-[#c41e06] text-white rounded-full font-bold text-base sm:text-lg md:text-[22px] transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-2xl active:scale-95 shadow-lg focus:outline-none focus:ring-4 focus:ring-[#E22807]/50 border-2 border-[#E22807]/20"
              >
                S'inscrire
              </button>
            </div>
          </form>

          
          <footer className='mt-4 sm:mt-6 md:mt-8 text-center'>
            <p className='text-sm sm:text-base md:text-[18px] text-gray-700 font-medium mb-3 sm:mb-4 md:mb-5'>
              Vous avez déjà un compte ?
            </p>
            <button 
              type="button"
              className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full font-bold text-base sm:text-lg md:text-[22px] transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-2xl active:scale-95 shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-900/50 border-2 border-gray-700/30"
              onClick={() => navigate('/login')}
            >
              Se connecter
            </button>
          </footer>

        </article>
      </section>
    </main>
  )
}
