import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import './Home.scss';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <nav className='navbar' aria-label='Navigation principale'>
          <div className='navbar-logo'>
            <Logo />
          </div>
          <p className='navbar-slogan'>
            Commencez votre parcours de mise en forme dès aujourd'hui
          </p>
          <div className='navbar-buttons'>
            <button className='btn-register' onClick={() => navigate('/register')}>
              S'inscrire
            </button>
            <button className='btn-login' onClick={() => navigate('/login')}>
              Se connecter
            </button>
          </div>
        </nav>
      </header>

      <main className='home-container'>

      <section className='hero-section' aria-label='Section principale'>
        <h1 className='hero-title'>
          Atteignez vos objectifs<br />de remise en forme
        </h1>
        <p className='hero-subtitle'>
          Transformez votre corps avec des programmes personnalisés
        </p>
        <div className='hero-buttons'>
          <button className='btn-try-free' onClick={() => navigate('/register')}>
            Essayer gratuitement
          </button>
          <button className='btn-have-account' onClick={() => navigate('/login')}>
            J'ai déjà un compte
          </button>
        </div>
      </section>

      <section className='about-section' aria-labelledby='about-title'>
        <h2 id='about-title' className='about-title'>ProgFit c'est quoi ?</h2>
        <div className='about-content'>
          <p>
            ProgFit est votre compagnon idéal pour atteindre vos objectifs de remise en forme. 
            Nous proposons des programmes d'entraînement personnalisés, adaptés à votre niveau 
            et à vos objectifs, que vous soyez débutant ou confirmé.
          </p>
        </div>
      </section>

      <section className='for-who-section' aria-labelledby='for-who-title'>
        <h2 id='for-who-title' className='for-who-title'>Pour qui ?</h2>
        <div className='for-who-grid'>
          <div className='for-who-card'>
            <div className='for-who-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3 className='for-who-card-title'>Débutants</h3>
            <p className='for-who-card-description'>
              Vous débutez dans le sport ? Nos programmes sont conçus pour vous accompagner pas à pas dans votre découverte du fitness.
            </p>
          </div>

          <div className='for-who-card'>
            <div className='for-who-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h3 className='for-who-card-title'>Intermédiaires</h3>
            <p className='for-who-card-description'>
              Vous avez déjà une base solide ? Perfectionnez votre technique et franchissez un nouveau palier avec nos programmes intermédiaires.
            </p>
          </div>

          <div className='for-who-card'>
            <div className='for-who-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <h3 className='for-who-card-title'>Avancés</h3>
            <p className='for-who-card-description'>
              Athlète confirmé ? Repoussez vos limites avec nos programmes avancés et atteignez des performances exceptionnelles.
            </p>
          </div>
        </div>
      </section>

      <section className='why-section' aria-labelledby='why-title'>
        <h2 id='why-title' className='why-title'>Pourquoi choisir ProgFit ?</h2>
        <div className='why-grid'>
          <div className='why-card'>
            <h3 className='why-card-title'>Accessible partout</h3>
            <p className='why-card-description'>
              Entraînez-vous où vous voulez, quand vous voulez. Accédez à vos programmes depuis n'importe quel appareil.
            </p>
          </div>

          <div className='why-card'>
            <h3 className='why-card-title'>Adapté à ton niveau</h3>
            <p className='why-card-description'>
              Des programmes conçus pour tous les niveaux, du débutant à l'expert. Progressez à votre rythme.
            </p>
          </div>

          <div className='why-card'>
            <h3 className='why-card-title'>Sans matériel</h3>
            <p className='why-card-description'>
              Pas besoin d'équipement coûteux. Tous nos exercices peuvent être réalisés au poids du corps.
            </p>
          </div>
        </div>
      </section>

      <footer className='footer' role='contentinfo'>
        <div className='footer-content'>
          <p className='footer-text'>© 2025 ProgFit. Tous droits réservés.</p>
          <button 
            className='footer-link' 
            onClick={() => navigate('/politique-confidentialite')}
            aria-label='Consulter la politique de confidentialité'
          >
            Politique de confidentialité
          </button>
        </div>
      </footer>
      </main>
    </>
  );
}
