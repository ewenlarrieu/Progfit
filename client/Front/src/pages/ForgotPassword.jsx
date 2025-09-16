import React from 'react'
import Logo from '../components/common/Logo'
import profileIcon from '/assets/img/iconamoon_profile-fill.png'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
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
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full mx-4 text-center">
              <Logo/>
              <p className="font-bold text-black mt-7 text-3xl tracking-widest" style={{fontFamily: 'Poppins, sans-serif'}}>Mot de passe oublier</p>
    
              <div className="w-30 h-30 rounded-full mx-auto mt-4 flex items-center justify-center relative">
                {/* Fond orange avec opacité */}
                <div className="absolute inset-0 bg-[#FF7D66] opacity-61 rounded-full"></div>
                {/* Icône sans opacité */}
                <img src={profileIcon} alt="Profile icon" className="w-16 h-16 relative z-10" />
              </div>
    
    
              <div className="mt-8 space-y-6">
                {/* Email */}
                <div className="flex justify-center">
                  <div className="w-full max-w-sm">
                    <p className='text-black font-medium tracking-widest text-[22px] mb-2 text-left' style={{fontFamily: 'Poppins, sans-serif', letterSpacing: '10%'}}>Email</p>
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="border border-black rounded-3xl p-2 w-full block placeholder-[#5A5A5A] text-black" 
                      style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'}}
                    />
                  </div>
                </div>
  
                
              </div>
       
               
    
    
           
    
              {/* Bouton Continuer */}
              <div className="mt-10 text-center">
                <button 
                  className="px-13 py-1.5 bg-[#E22807] text-white rounded-4xl font-semibold text-[28px] transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2" 
                  style={{fontFamily: 'Poppins, sans-serif',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
                  }}
                  
                >
                  Continuer
                </button>
              </div>
              
              <div className="mt-6 text-center ">
               <button className='text-2xl text-black underline transition-transform duration-150 ease-in-out hover:scale-105 inline-block'
               style={{fontFamily: 'Poppins, sans-serif'}}
               onClick={()=> navigate('/login')}>Retour</button>
              </div>
    
            </div>
           
          </div>
        </div>
      )
}
