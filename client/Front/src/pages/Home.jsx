import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-['Poppins',sans-serif]">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Logo/>
            </div>
            <div className="flex items-center space-x-6">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Connexion
              </Link>
              <Link 
                to="/register" 
                className="bg-[#E22807] text-white hover:bg-red-600 px-6 py-3 rounded-full font-medium transition-colors"
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center py-24">
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-8 leading-tight">
            Atteignez vos objectifs 
            <span className="block font-semibold text-[#E22807]">de remise en forme</span>
          </h1>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Transformez votre corps avec des programmes personnalisés 
            et un suivi intelligent de vos performances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/register" 
              className="bg-[#E22807] text-white hover:bg-red-600 px-10 py-4 rounded-full text-lg font-medium transition-all hover:scale-105"
            >
              Essayer gratuitement
            </Link>
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-gray-900 px-10 py-4 text-lg font-medium transition-colors"
            >
              J'ai déjà un compte →
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-6">
                  <svg className="w-16 h-16 text-[#E22807]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 8c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8zm7 0c.83 0 1.5.67 1.5 1.5S16.33 11 15.5 11 14 10.33 14 9.5 14.67 8 15.5 8zm-3.5 8c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Programmes Personnalisés</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Des entraînements adaptés à votre niveau et vos objectifs spécifiques.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-6">
                  <svg className="w-16 h-16 text-[#E22807]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 4h10v12H7V4zm5 15c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Accessible partout</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  Accède à tes entraînements depuis ton téléphone, ta tablette ou ton ordinateur, où que tu sois.
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-6">
                  <svg className="w-16 h-16 text-[#E22807]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900"> Adapté à ton niveau</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                 Que tu sois débutant ou confirmé, les programmes s’ajustent à ton rythme et à ta progression.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-[#E22807] rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-semibold text-sm">P</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">ProgFit</span>
          </div>
          <p className="text-gray-500 font-light mb-4">
            © 2025 ProgFit. Tous droits réservés.
          </p>
          <Link 
            to="/politique-confidentialite" 
            className="text-gray-400 hover:text-gray-600 transition-colors font-light"
          >
            Politique de confidentialité
          </Link>
        </div>
      </footer>
    </div>
  );
}