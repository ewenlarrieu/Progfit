import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import './Home.scss';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className='home-container'>
      <nav className='navbar'>
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

      <section className='hero-section'>
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

      <section className='about-section'>
        <h2 className='about-title'>ProgFit c'est quoi ?</h2>
        <div className='about-content'>
          <p>
            ProgFit est votre compagnon idéal pour atteindre vos objectifs de remise en forme. 
            Nous proposons des programmes d'entraînement personnalisés, adaptés à votre niveau 
            et à vos objectifs, que vous soyez débutant ou confirmé.
          </p>
        </div>
      </section>

      <section className='why-section'>
        <h2 className='why-title'>Pourquoi choisir ProgFit ?</h2>
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
    </div>
  );
}
