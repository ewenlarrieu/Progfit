import React from 'react'
import NavBar from '../components/common/NavBar'
import profileIcon from '/assets/img/iconamoon_profile-fill.png'

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavBar/>
      <div 
        className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8 text-white" 
        style={{ fontFamily: 'Poppins, sans-serif'}}
      >
        {/* Bloc d'accueil */}
        <div className="bg-[#E22807] rounded-lg p-4 sm:p-6">
          <p className="text-2xl sm:text-3xl font-semibold">Bonjour Ewen</p>
          <p className="mt-2 text-sm sm:text-base md:text-lg">
            Today is Monday, January 12. You have 2 workouts planned, your next
            session is in 3 days, and you need to complete 2,000 more steps to
            reach your daily goal. Keep pushing forward!
          </p>
        </div>

        {/* Bloc Programme & Séance terminé */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow flex-1">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-black text-center font-bold text-2xl md:text-3xl pb-6">
                  Programme actuel
                </p>
                <p className="text-black text-center font-semibold text-xl pb-4"></p>
                <p className="text-black text-center font-normal text-lg pb-4"></p>
              </div>
              <div className="flex justify-end mt-6">
                <button className="bg-[#E22807] hover:bg-[#c41c00] text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200">
                  Voir
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow flex-1">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-black text-center font-bold text-2xl md:text-3xl pb-6">
                  Séance terminée
                </p>
                <p className="text-black text-center font-semibold text-xl"></p>
              </div>
              <div className="flex justify-end mt-6">
                <button className="bg-[#E22807] hover:bg-[#c41c00] text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200">
                  Voir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bloc Prochaine Séance & Historique */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow flex-1">
            <p className="text-black text-center font-bold text-2xl md:text-3xl pb-6">
              Prochaine Séance
            </p>
            <p className="text-black text-center font-semibold text-xl pb-4"></p>
            <div className="flex justify-center mt-6">
              <button className="bg-[#E22807] hover:bg-[#c41c00] text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200">
                Commencer maintenant
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow flex-1">
            <p className="text-black text-left font-bold text-2xl md:text-3xl pb-6">
              Historique
            </p>
          </div>
        </div>

        {/* Bloc Profil */}
        <div className="flex mt-6">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow w-full max-w-3xl mx-auto flex flex-col items-center">
            <img src={profileIcon} alt="" className="w-20 h-20 sm:w-24 sm:h-24 mb-4" />
            <p className="text-black text-center font-bold text-2xl md:text-3xl pb-6">
              Nom profil
            </p>

            <div className="border-b-2 border-black w-full mb-5"></div>
            <div className="flex flex-col text-[#E22807] font-bold gap-3 text-base sm:text-lg">
              <p>Objectif : <span></span></p>
              <p>Programme en cours : <span></span></p>
              <p>Séance terminée : <span></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
