import React from 'react'
import Logo from '../components/common/Logo'
import profileIcon from '/assets/img/iconamoon_profile-fill.png'
import { useNavigate } from 'react-router-dom'


export default function Register() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen relative">
      {/* Image d'arrière-plan floue pour remplir les espaces */}
      <div 
        className="absolute inset-0 w-full h-screen opacity-80 blur-sm bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/img/unsplash_sHfo3WOgGTU.png)',
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


          <div className="flex gap-7 mt-10 responsive-row">
            {/* Input Pseudo */}
            <div className="text-left flex-1">
              <p className='text-black font-medium tracking-widest text-[22px] mb-2 text-left' style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '10%'}}>Votre Pseudo</p>
              <input 
                type="text" 
                placeholder="Pseudo" 
                className="border border-black rounded-3xl p-2 w-full block placeholder-[#5A5A5A] text-black responsive-input" 
                style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
              />
            </div>
            
            {/* Input Email */}
            <div className="text-left flex-1">
              <p className='text-black font-medium tracking-widest text-[22px] mb-2 text-left' style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '10%'}}>Votre email</p>
              <input 
                type="email" 
                placeholder="Email" 
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
                type="Passwod" 
                placeholder="Mot de passe" 
                className="border border-black rounded-3xl p-2 w-full block placeholder-[#5A5A5A] text-black responsive-input" 
                style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
              />
            </div>
            
            {/*Mot de passe confirmer */}
            <div className="text-left flex-1">
              <p className='text-black font-medium tracking-widest text-[18px] mb-2 text-left' style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '10%'}}>Confirmer votre mot de passe</p>
              <input 
                type="password" 
                placeholder="Mot de passe confirmer" 
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
                className="border border-black rounded-3xl p-2 w-full block text-black bg-white responsive-input" 
                style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
              >
                <option value="" className="text-[#5A5A5A]">Sélectionnez votre objectif</option>
                <option value="prise-de-masse" className="text-black">Prise de masse</option>
                <option value="perte-de-poids" className="text-black">Perte de poids</option>
                <option value="entretien" className="text-black">Entretien</option>
                <option value="force" className="text-black">Force</option>
              </select>
            </div>
          </div>

          {/* Bouton Continuer */}
          <div className="mt-10 text-center">
            <button 
              className="px-13 py-1.5 bg-[#E22807] text-white rounded-4xl font-semibold text-[28px] transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2" 
              style={{fontFamily: 'Poppins, sans-serif',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
            >
              Continuer
            </button>
          </div>
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
