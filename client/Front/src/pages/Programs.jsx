import React from 'react'
import NavBar from '../components/common/NavBar'

import imgProgramme1 from '../components/common/imgProgramms/imgProgramme1.png'
import imgProgramme2 from '../components/common/imgProgramms/imgProgramme2.png'
import imgProgramme3 from '../components/common/imgProgramms/imgProgramme3.png'
import imgProgramme4 from '../components/common/imgProgramms/imgProgramme4.png'
import imgProgramme5 from '../components/common/imgProgramms/imgProgramme5.png'
import imgProgramme6 from '../components/common/imgProgramms/imgProgramme6.png'
import imgProgramme7 from '../components/common/imgProgramms/imgProgramme7.png'
import imgProgramme8 from '../components/common/imgProgramms/imgProgramme8.png'
import imgProgramme9 from '../components/common/imgProgramms/imgProgramme9.png'
import imgProgramme10 from '../components/common/imgProgramms/imgProgramme10.png'
import imgProgramme11 from '../components/common/imgProgramms/imgProgramme11.png'

export default function Programs() {
  // Tableau avec toutes les images
  const programs = [
    imgProgramme1,
    imgProgramme2,
    imgProgramme3,
    imgProgramme4,
    imgProgramme5,
    imgProgramme6,
    imgProgramme7,
    imgProgramme8,
    imgProgramme9,
    imgProgramme10,
    imgProgramme11,
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavBar />
     <div
  className="flex-1 ml-64 p-8 text-white flex flex-col max-w-full"
  style={{ fontFamily: 'Poppins, sans-serif' }}
>
  {/* Titres alignés à gauche */}
  <p className="text-black font-bold text-3xl underline pb-15">
    Liste des programmes
  </p>
  <p className="bg-[#E22807] text-white px-6 py-4 rounded-lg w-fit font-semibold text-4xl mb-10">
    Catalogue de programmes
  </p>

  {/* Barre de recherche et filtres alignés à gauche */}
  <div className="flex flex-row gap-4 mt-6 pb-20">
    <input
      type="text"
      placeholder="Rechercher un programme"
      className="border-2 border-black rounded-lg px-4 py-2 text-black w-64"
    />
    <select
      className="border-2 border-black rounded-lg px-4 py-2 text-black w-48"
      defaultValue=""
    >
      <option value="" disabled hidden>
        Objectif
      </option>
      <option value="prise_de_masse">Prise de masse</option>
      <option value="perte_de_poids">Perte de poids</option>
      <option value="entretien">Entretien</option>
      <option value="force">Force</option>
    </select>
    <select
      className="border-2 border-black rounded-lg px-4 py-2 text-black"
      defaultValue=""
    >
      <option value="" disabled hidden>
        Niveau
      </option>
      <option value="debutant">Débutant</option>
      <option value="intermediaire">Intermédiaire</option>
      <option value="avance">Avancé</option>
    </select>
  </div>

  {/* Grille des programmes centrée */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 justify-items-center max-w-6xl mx-auto">
    {programs.map((img, index) => (
      <div
        key={index}
        className="bg-white rounded-lg border-2 border-black p-8 flex justify-center items-center h-56 w-80"
      >
        <img
          src={img}
          alt={`Programme ${index + 1}`}
          className="max-h-44 max-w-72 object-contain"
        />
      </div>
    ))}
  </div>
</div>
    </div>
  )
}
