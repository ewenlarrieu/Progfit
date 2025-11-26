import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

import imgProgramme1 from '../../imgProgramms/imgProgramme1.png';
import imgProgramme2 from '../../imgProgramms/imgProgramme2.png';
import imgProgramme3 from '../../imgProgramms/imgProgramme3.png';
import imgProgramme4 from '../../imgProgramms/imgProgramme4.png';
import imgProgramme5 from '../../imgProgramms/imgProgramme5.png';
import imgProgramme6 from '../../imgProgramms/imgProgramme6.png';
import imgProgramme7 from '../../imgProgramms/imgProgramme7.png';
import imgProgramme8 from '../../imgProgramms/imgProgramme8.png';
import imgProgramme9 from '../../imgProgramms/imgProgramme9.png';
import imgProgramme10 from '../../imgProgramms/imgProgramme10.png';
import imgProgramme11 from '../../imgProgramms/imgProgramme11.png';

export default function Programs() {
  const images = [
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
  ];

  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleViewDetails = (Id) => {
    navigate(`/detailsprogramms/${Id}`);
  };

  useEffect(() => {
    fetch('https://progfit-backend.onrender.com/api/programmes')
      .then(res => {
        if (!res.ok) throw new Error('Erreur');
        return res.json();
      })
      .then(data => {
        setProgrammes(data.programmes ?? []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Impossible de charger les programmes.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavBar />
      <div
        className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8 pt-20 md:pt-8 text-white flex flex-col max-w-full"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        {/* Titres */}
        <p className="text-black font-bold text-2xl sm:text-3xl md:text-4xl underline mb-6">
          Liste des programmes
        </p>
        <p className="bg-[#E22807] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg w-fit font-semibold text-2xl sm:text-3xl md:text-4xl mb-8">
          Catalogue de programmes
        </p>

        {/* Gestion loading et erreurs */}
        {loading && <p className="text-black">Chargement en cours...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {/* Grille des programmes */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-6 w-full">
            {programmes.map((p, index) => (
              <div
                key={p._id || index}
                className="bg-white rounded-lg border border-black p-4 sm:p-6 flex flex-col justify-between items-center w-full shadow"
              >
                <img
                  src={images[index % images.length]}
                  alt={p.nom ?? `Programme ${index + 1}`}
                  className="h-40 sm:h-44 w-full object-contain mb-4"
                />
                <p className="text-black font-bold text-lg sm:text-xl mb-2">
                  {p.nom}
                </p>
                <p className="text-black px-3 sm:px-4 py-1 rounded-lg bg-[#FF7D66] mb-2 text-sm sm:text-base">
                  Catégorie : {p.objectif}
                </p>
                <p className="text-black text-sm sm:text-base md:text-lg mb-2">
                  Durée : {p.duree} semaines
                </p>
                <p className="text-black text-sm sm:text-base md:text-lg mb-2">
                  Niveau : {p.niveau}
                </p>
                <button
                  onClick={() => handleViewDetails(p._id)}
                  className="mt-2 px-4 sm:px-6 py-2 bg-[#E22807] text-white rounded-lg shadow-md hover:bg-[#c31f05] transition duration-300"
                >
                  Voir les détails
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
