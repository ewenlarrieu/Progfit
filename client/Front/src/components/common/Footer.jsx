import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">💪</span>
              </div>
              <span className="text-xl font-bold">Progfit</span>
            </div>
            <p className="text-gray-400 text-sm">
              Votre coach fitness personnel pour atteindre vos objectifs.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => window.location.href = '/index.html'}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Accueil
                </button>
              </li>
              <li>
                <a href="/programs" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Programmes
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="text-sm text-gray-400 space-y-2">
              <p>support@progfit.com</p>
              <p>+33 1 23 45 67 89</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 Progfit. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;