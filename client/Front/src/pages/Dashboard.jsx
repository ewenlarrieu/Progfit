import React from 'react'
import NavBar from '../components/common/NavBar'
import profileIcon from '/assets/img/iconamoon_profile-fill.png'
import Logo from '../components/common/Logo'



export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavBar/>
      <div className="flex-1 ml-64 p-8 text-white" style={{ fontFamily: 'Poppins, sans-serif'}}>
        <div className="bg-[#E22807] rounded-lg p-6">
          <p className="text-3xl font-semibold">Bonjour Ewen</p>
          <p className="mt-2">Today is Monday, January 12. You have 2 workouts planned, your next session is in 3 days, and you need to complete 2,000 more steps to reach your daily goal. Keep pushing forward!</p>
        </div>
        <div className="flex gap-6 mt-6">
          <div className="bg-white rounded-lg p-6 shadow flex-1 min-w-0 h-full">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className='text-black text-center font-bold text-3xl pb-10'>Programme actuel</p>
                  <p className='text-black text-center font-semibold text-2xl pb-5'></p>
                  <p className='text-black text-center font-normal text-2xl pb-6'></p>
                </div>
                <div className="flex justify-end mt-6">
                  <button className="bg-[#E22807] hover:bg-[#c41c00] text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">Voir</button>
                </div>
              </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow flex-1 min-w-0 flex flex-col justify-between h-full">
          <div className="h-full">
              <p className='text-black text-center font-bold text-3xl pb-10'>Séance terminé</p>
              <p className='text-black text-center font-semibold text-2xl'></p>
            </div>
            <div className="flex justify-end mt-6">
              <button className="bg-[#E22807] hover:bg-[#c41c00] text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">Voir</button>
            </div>
          </div>
        </div>
        <div className='flex gap-6 mt-6'>
          <div className="bg-white rounded-lg p-6 shadow flex-1 min-w-0 h-full">
            <p className='text-black text-center font-bold text-3xl pb-10'>Prochaine Séance</p>
            <p className='text-black text-center font-semibold text-2xl pb-5'></p>
            <div className="flex justify-center mt-6">
              <button className="bg-[#E22807] hover:bg-[#c41c00] text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">Commencer maintenant</button>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow flex-1 min-w-0 h-full">
            <p className='text-black text-left font-bold text-3xl pb-10'>Historique</p>
          </div>
        </div>
          <div className='flex gap-6 mt-6'>
            
          </div>
        <div className='flex mt-6'>
          <div className='bg-white rounded-lg p-6 shadow max-w-3xl w-full mx-auto flex justify-center flex-col'>
            <img src={profileIcon} alt="" className="w-25 h-25 mx-auto mb-4" />
            <p className='text-black text-center font-bold text-3xl pb-10'>Nom profil</p>
            
         
            <div className="border-b-2 border-black -mx-6 mb-5 "></div>
            <div className='flex flex-col text-[#E22807] font-bold gap-4'>
            <p>Objectif :<span></span></p>
             <p>Programme en cours :<span></span></p>
             <p>Séance terminer :<span></span></p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
