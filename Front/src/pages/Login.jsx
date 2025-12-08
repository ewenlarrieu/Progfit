import React, { useState } from 'react'
import Logo from '../components/Logo'
import profileIcon from '../../img/iconamoon_profile-fill.png'
import backgroundImage from '../../img/unsplash_j8fVoo3i8xk.png'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config/api';
import '../style/style.css'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      localStorage.setItem('token', data.token)
      navigate('/dashboard')

    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="login-main">
      <div 
        className="login-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        role="presentation"
        aria-hidden="true"
      >
       
      </div>
     
      <nav className="login-nav">
        <button
          onClick={() => navigate('/')}
          className="login-back-button"
          aria-label="Retour à la page d'accueil"
        >
          Retour   
        </button>
      </nav>

      <section className="login-section" aria-labelledby="login-title">
        <article className="login-card">
       
          <header className="login-header">
            <Logo />
            <h1 className="login-title">
              Connectez-vous
            </h1>
          </header>

          <div className="login-profile-icon" role="img" aria-label="Icône de profil utilisateur">
            <div className="login-profile-icon-bg"></div>
            <img src={profileIcon} alt="" aria-hidden="true" />
          </div>

 
          <form onSubmit={handleLogin} className="login-form" aria-label="Formulaire de connexion">
            <fieldset className="login-form-fields">
              <legend className="sr-only">Informations de connexion</legend>
              <div className="login-form-container">
                <div className="login-form-group">
                  <label htmlFor="email" className="login-label">
                    Email
                  </label>
                  <input 
                    type="email"
                    id="email"
                    placeholder="votre@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="login-input"
                  />
                </div>

                <div className="login-form-group">
                  <label htmlFor="password" className="login-label">
                    Mot de passe
                  </label>
                  <input 
                    type="password"
                    id="password"
                    placeholder="Votre mot de passe" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="login-input"
                  />
                </div>
              </div>
            </fieldset>

          
            {error && (
              <div role="alert" className="login-error">
                <p>{error}</p>
              </div>
            )}

          
            <div className="login-submit-container">
              <button 
                type="submit"
                className="login-submit-button"
              >
                Continuer
              </button>
            </div>
          </form>

          <footer className="login-footer">
            <p className="login-footer-text">
              Vous n'avez pas de compte ?
            </p>
            <button 
              type="button"
              className="login-register-button"
              onClick={() => navigate('/register')}
            >
              Créer un compte
            </button>
          </footer>

        </article>
      </section>
    </main>
  )
   
}
