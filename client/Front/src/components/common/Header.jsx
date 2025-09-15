import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const handleHomeClick = () => {
    window.location.href = '/index.html';
  };

  return (
    <header className="bg-red-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleHomeClick}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold text-xl">💪</span>
            </div>
            <span className="text-white text-xl font-bold">Progfit</span>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={handleHomeClick}
              className="text-white hover:text-red-200 transition-colors duration-200"
            >
              Accueil
            </button>
            <Link 
              to="/programs" 
              className={`transition-colors duration-200 ${
                isActive('/programs') 
                  ? 'text-red-200 border-b-2 border-red-200' 
                  : 'text-white hover:text-red-200'
              }`}
            >
              Programmes
            </Link>
            <Link 
              to="/dashboard" 
              className={`transition-colors duration-200 ${
                isActive('/dashboard') 
                  ? 'text-red-200 border-b-2 border-red-200' 
                  : 'text-white hover:text-red-200'
              }`}
            >
              Dashboard
            </Link>
          </nav>

          {/* Boutons d'authentification */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-white hover:text-red-200 transition-colors duration-200"
            >
              Connexion
            </Link>
            <Link 
              to="/signup" 
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-200"
            >
              S'inscrire
            </Link>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-200 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-red-500">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={handleHomeClick}
                className="text-white hover:text-red-200 py-2 text-left transition-colors duration-200"
              >
                Accueil
              </button>
              <Link 
                to="/programs" 
                className="text-white hover:text-red-200 py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Programmes
              </Link>
              <Link 
                to="/dashboard" 
                className="text-white hover:text-red-200 py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="border-t border-red-500 pt-2 mt-2">
                <Link 
                  to="/login" 
                  className="text-white hover:text-red-200 py-2 block transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/signup" 
                  className="text-white hover:text-red-200 py-2 block transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  S'inscrire
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;