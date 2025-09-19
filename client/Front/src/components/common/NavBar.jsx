import React from 'react'
import Logo from './Logo'
import { useNavigate, useLocation } from 'react-router-dom'

export default function NavBar() {
    const navigate = useNavigate()
    const location = useLocation()
    
    // Fonction pour déterminer si une route est active
    const isActive = (path) => {
      if (path === '/dashboard') {
        return location.pathname === '/dashboard' || location.pathname === '/'
      }
      return location.pathname === path
    }
    
    // Fonction pour obtenir les styles selon l'état actif
    const getNavItemStyle = (path) => {
      if (isActive(path)) {
        return {
          color: '#E22807',
          textDecoration: 'underline',
          fontFamily: 'Poppins, sans-serif'
        }
      }
      return {
        fontFamily: 'Poppins, sans-serif'
      }
    }
    
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/#/login'
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-200 shadow-lg z-40">
      <div className="flex flex-col h-full">
        {/* Header avec Logo */}
        <div className="p-6 border-b-2 border-black">
          <Logo/>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button className={`flex items-center p-3 font-semibold ${isActive('/dashboard') ? 'text-[#E22807]' : 'text-black'}`}
              style={getNavItemStyle('/dashboard')}
              onClick={() => navigate('/dashboard')}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                Tableau de bord
              </button>
            </li>
            <li>
              <button className={`flex items-center p-3 font-semibold cursor-pointer ${isActive('/programs') ? 'text-[#E22807]' : 'text-black'}`}
              style={getNavItemStyle('/programs')}
               onClick={() => navigate('/programs')}>
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Programme
              </button>
            </li>
            <li>
              <button className={`flex items-center p-3 font-semibold cursor-pointer ${isActive('/detailsprogramms') ? 'text-[#E22807]' : 'text-black'}`}
              style={getNavItemStyle('/detailsprogramms')}
              onClick={() => navigate('/detailsprogramms')}>
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Detail programme
              </button>
            </li>
            <li>
              <button className={`flex items-center p-3 font-semibold cursor-pointer text-left ${isActive('/SeanceEntrainement') ? 'text-[#E22807]' : 'text-black'}`}
              style={getNavItemStyle('/SeanceEntrainement')}
               onClick={() => navigate('/SeanceEntrainement')}>
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16M8 4v16M16 4v16" />
                  <circle cx="8" cy="8" r="2" />
                  <circle cx="16" cy="8" r="2" />
                  <circle cx="8" cy="16" r="2" />
                  <circle cx="16" cy="16" r="2" />
                </svg>
                Séance d'entrainement
              </button>
            </li>
            {/* Ligne de séparation */}
            <div className="border-b-2 border-black -mx-4 mb-2"></div>
            <li>
              <button className={`flex items-center p-3 font-semibold cursor-pointer ${isActive('/profile') ? 'text-[#E22807]' : 'text-black'}`}
              style={getNavItemStyle('/profile')}
               onClick={() => navigate('/profile')}>
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mon compte
              </button>
            </li>
            <li>
              <button className="flex items-center p-3 text-black font-semibold cursor-pointer"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              onClick={handleLogout}>
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>
            </li>
          </ul>
        
        </nav>
        
      </div>
    </div>
  )
}
