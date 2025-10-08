import React, { useState } from 'react'
import Logo from '../components/common/Logo'
import profileIcon from '/assets/img/iconamoon_profile-fill.png'
import backgroundImage from '/assets/img/unsplash_j8fVoo3i8xk.png'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    niveau: '',
    objectifs: ''
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rgpdConsent, setRgpdConsent] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setIsLoading(true)

    // Validation côté client
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Tous les champs obligatoires doivent être remplis')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setIsLoading(false)
      return
    }

    if (!rgpdConsent) {
      setError('Vous devez accepter la politique de confidentialité pour créer un compte')
      setIsLoading(false)
      return
    }

    try {
      // Préparer les objectifs comme tableau
      const objectifs = formData.objectifs ? [formData.objectifs] : []

      const response = await fetch('https://progfit.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          niveau: formData.niveau,
          objectifs: objectifs,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'inscription')
      }

      setMessage(data.message || 'Compte créé avec succès ! Un email de vérification a été envoyé à votre adresse.')
      setError('') // Clear any previous errors
      
      // Redirection après succès - délai plus long pour lire le message
      setTimeout(() => {
        navigate('/login')
      }, 7000)
    } catch (err) {
      // Gestion spécifique des erreurs email vs autres erreurs
      if (err.message.includes('email') || err.message.includes('Email')) {
        setError(err.message + ' Contactez le support si le problème persiste.')
      } else {
        setError(err.message)
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen relative">
      {/* Image d'arrière-plan floue pour remplir les espaces */}
      <div 
        className="absolute inset-0 w-full h-screen   bg-cover "
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>
      
      {/* Image principale nette avec object-contain */}
      
      
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full mx-4 text-center responsive-card responsive-card-width" >
          <Logo/>
          <p className="font-bold text-black mt-7 text-3xl tracking-widest responsive-title" style={{fontFamily: 'Poppins, sans-serif'}}>Crée votre compte</p>

          <div className="w-30 h-30 rounded-full mx-auto mt-4 flex items-center justify-center relative responsive-icon">
            {/* Fond orange avec opacité */}
            <div className="absolute inset-0 bg-[#FF7D66] opacity-61 rounded-full"></div>
            {/* Icône sans opacité */}
            <img src={profileIcon} alt="Profile icon" className="w-16 h-16 relative z-10" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex gap-7 mt-10 responsive-row">
              {/* Input Pseudo */}
              <div className="text-left flex-1">
                <p className='text-black font-medium tracking-widest text-[22px] mb-2 text-left' style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '10%'}}>Votre Pseudo</p>
                <input 
                  type="text" 
                  name="username"
                  placeholder="Pseudo" 
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="border border-black rounded-3xl p-2 w-full block placeholder-[#5A5A5A] text-black responsive-input" 
                  style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
                />
              </div>
            
              {/* Input Email */}
              <div className="text-left flex-1">
                <p className='text-black font-medium tracking-widest text-[22px] mb-2 text-left' style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '10%'}}>Votre email</p>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border border-black rounded-3xl p-2 w-full block placeholder-[#5A5A5A] text-black responsive-input" 
                  style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
                />
              </div>
            </div>

            <div className="flex gap-7 mt-10 responsive-row">
              {/* Input Mot de passe */}
              <div className="text-left flex-1">
                <p className='text-black font-medium tracking-widest text-[18px] mb-2 text-left' style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '10%'}}>Mot de Passe</p>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Mot de passe" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="border border-black rounded-3xl p-2 w-full block placeholder-[#5A5A5A] text-black responsive-input" 
                  style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
                />
              </div>
              
              {/*Mot de passe confirmer */}
              <div className="text-left flex-1">
                <p className='text-black font-medium tracking-widest text-[18px] mb-2 text-left' style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '10%'}}>Confirmer votre mot de passe</p>
                <input 
                  type="password" 
                  name="confirmPassword"
                  placeholder="Mot de passe confirmer" 
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="border border-black rounded-3xl p-2 w-full block placeholder-[#5A5A5A] text-black responsive-input" 
                  style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
                />
              </div>
            </div>


            <div className="flex gap-7 mt-10 responsive-row">
              {/* Niveau en sport */}
              <div className="text-left flex-1">
                <p className='text-black font-medium tracking-widest text-[22px] mb-2 text-left' style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '10%'}}>Votre niveau en sport</p>
                <select 
                  name="niveau"
                  value={formData.niveau}
                  onChange={handleInputChange}
                  className="border border-black rounded-3xl p-2 w-full block text-black bg-white responsive-input" 
                  style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
                >
                  <option value="" className="text-[#5A5A5A]">Sélectionnez votre niveau</option>
                  <option value="debutant" className="text-black">Débutant</option>
                  <option value="intermediaire" className="text-black">Intermédiaire</option>
                  <option value="avance" className="text-black">Avancé</option>
                </select>
              </div>
              
              {/*Objectif principal */}
              <div className="text-left flex-1">
                <p className='text-black font-medium tracking-widest text-[22px] mb-2 text-left' style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '10%'}}>Votre objectif principal</p>
                <select 
                  name="objectifs"
                  value={formData.objectifs}
                  onChange={handleInputChange}
                  className="border border-black rounded-3xl p-2 w-full block text-black bg-white responsive-input" 
                  style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
                >
                  <option value="" className="text-[#5A5A5A]">Sélectionnez votre objectif</option>
                  <option value="prise de masse" className="text-black">Prise de masse</option>
                  <option value="perte de poids" className="text-black">Perte de poids</option>
                  <option value="entretien" className="text-black">Entretien</option>
                  <option value="force" className="text-black">Force</option>
                </select>
              </div>
            </div>

            {/* Consentement RGPD */}
            <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="rgpdConsent"
                  checked={rgpdConsent}
                  onChange={(e) => setRgpdConsent(e.target.checked)}
                  className="mt-1 mr-3 w-4 h-4 text-[#E22807] border-gray-300 rounded focus:ring-[#E22807]"
                  required
                />
                <label htmlFor="rgpdConsent" className="text-sm text-gray-700 leading-relaxed">
                  J'accepte que mes données personnelles soient collectées et traitées conformément à la{' '}
                  <Link 
                    to="/politique-confidentialite" 
                    target="_blank"
                    className="text-[#E22807] underline hover:text-[#c41e06] font-medium"
                  >
                    politique de confidentialité
                  </Link>
                  . Je comprends que je peux exercer mes droits RGPD à tout moment.
                </label>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
            {message && <p className="text-green-600 text-sm mt-4 text-center">{message}</p>}

            {/* Bouton Continuer */}
            <div className="mt-10 text-center">
              <button 
                type="submit"
                disabled={isLoading}
                className="px-13 py-1.5 bg-[#E22807] text-white rounded-4xl font-semibold text-[28px] transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed" 
                style={{fontFamily: 'Poppins, sans-serif',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
              >
                {isLoading ? 'Inscription...' : 'Continuer'}
              </button>
            </div>
          </form>
          <div className='mt-6 text-center '>
            <p className='text-[18px] text-black font-medium' style={{fontFamily: 'Poppins, sans-serif'}}>Vous avez déja un compte ?
                
            </p>
          </div>
          <div className="mt-6 text-center">
            <button 
              className="px-13 py-1.5 bg-black text-white rounded-4xl font-semibold text-[28px] transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2" 
              style={{fontFamily: 'Poppins, sans-serif',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
              onClick={() => navigate('/login')}
            >
              Se connecter
            </button>
          </div>

        </div>
       
      </div>
    </div>
  )
}
