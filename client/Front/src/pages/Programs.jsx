import React from 'react'
import NavBar from '../components/common/NavBar'
import imgProgramme1 from '../components/common/imgProgramms/imgProgramme1.png'

import imgProgramme2 from '../components/common/imgProgramms/imgProgramme2.png';
import imgProgramme3 from '../components/common/imgProgramms/imgProgramme3.png';


export default function Programs() {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <NavBar/>
      <div className="flex-1 ml-64 p-8 text-white" style={{ fontFamily: 'Poppins, sans-serif'}}>
      <p className='text-black font-bold text-3xl underline pb-15'>Liste des programmes</p>
      <p className='bg-[#E22807] text-white px-6 py-4 rounded-lg w-fit font-semibold text-4xl mb-10'>Catalogue de programmes</p>
  <div className='flex flex-row gap-4 mt-6 justify-center pb-20'>
        <input 
          type="text" 
          placeholder="Rechercher un programme" 
          className="border-2 border-black rounded-lg px-4 py-2 text-black f w-64"
        />
        <select
          className="border-2 border-black rounded-lg px-4 py-2 text-black   w-48 "
          defaultValue=""
        >
          <option value="" disabled hidden>Objectif</option>
          <option value="prise_de_masse">Prise de masse</option>
          <option value="perte_de_poids">Perte de poids</option>
          <option value="entretien">Entretien</option>
          <option value="force">Force</option>
        </select>
        <select
          className="border-2 border-black rounded-lg px-4 py-2  text-black"
          defaultValue=""
        >
          <option value="" disabled hidden>Niveau</option>
          <option value="debutant">Débutant</option>
          <option value="intermediaire">Intermédiaire</option>
          <option value="avance">Avancé</option>
        </select>
      </div>
    
      
      <div className="flex gap-8 mt-10">
        <div className="bg-white rounded-lg border-2 border-black p-8 flex justify-center items-center h-56 w-96">
          <img src={imgProgramme1} alt="Programme 1" className="max-h-44 max-w-80 object-contain" />
        </div>
        <div className="bg-white rounded-lg border-2 border-black p-8 flex justify-center items-center h-56 w-96">
          <img src={imgProgramme2} alt="Programme 2" className="max-h-44 max-w-80 object-contain" />
        </div>
        <div className="bg-white rounded-lg border-2 border-black p-8 flex justify-center items-center h-56 w-96">
          <img src={imgProgramme3} alt="Programme 3" className="max-h-44 max-w-80 object-contain" />
        </div>
      </div>
       <div className="flex gap-6 mt-10">
        <div className="flex-1 bg-white rounded-lg border-2 border-black p-8 min-w-0"></div>
        <div className="flex-1 bg-white rounded-lg border-2 border-black p-8 min-w-0"></div>
        <div className="flex-1 bg-white rounded-lg border-2 border-black p-8 min-w-0"></div>
      </div>
       <div className="flex gap-6 mt-10">
        <div className="flex-1 bg-white rounded-lg border-2 border-black p-8 min-w-0"></div>
        <div className="flex-1 bg-white rounded-lg border-2 border-black p-8 min-w-0"></div>
        
      </div>
        </div>
        </div>
  )
}
