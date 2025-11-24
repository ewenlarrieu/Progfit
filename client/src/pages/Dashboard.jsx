import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import profileIcon from '../../img/iconamoon_profile-fill.png'

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    user: null,
    programmeActuel: null,
    seancesTerminees: [],
    prochaineSeance: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Récupérer les données du profil utilisateur
        const profileResponse = await fetch('https://progfit.onrender.com/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setDashboardData(prev => ({ ...prev, user: profileData.user }));
        }

        // Récupérer le programme actuel et les séances
        const programmeResponse = await fetch('https://progfit.onrender.com/api/user-programmes/actuel', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (programmeResponse.ok) {
          const programmeData = await programmeResponse.json();
          if (programmeData.programmeActuel) {
            setDashboardData(prev => ({
              ...prev,
              programmeActuel: programmeData.programmeActuel.programmeId,
              seancesTerminees: programmeData.programmeActuel.seancesTerminees || [],
              prochaineSeance: calculateNextSession(programmeData.programmeActuel)
            }));
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement du dashboard:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const calculateNextSession = (programmeActuel) => {
    if (!programmeActuel.programmeId || !programmeActuel.programmeId.seances) return null;
    
    const seancesTermineesIndex = programmeActuel.seancesTerminees?.map(s => s.seanceIndex) || [];
    const prochainIndex = seancesTermineesIndex.length;
    
    if (prochainIndex < programmeActuel.programmeId.seances.length) {
      return {
        index: prochainIndex,
        seance: programmeActuel.programmeId.seances[prochainIndex]
      };
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <NavBar/>
        <div className="flex-1 md:ml-64 p-8 flex justify-center items-center">
          <p className="text-black text-xl">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavBar/>
      <div 
        className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8 text-white" 
        style={{ fontFamily: 'Poppins, sans-serif'}}
      >
        {/* Bloc d'accueil */}
        <div className="bg-[#E22807] rounded-lg p-4 sm:p-6">
          <p className="text-2xl sm:text-3xl font-semibold">
            Bonjour {dashboardData.user?.nom || 'Utilisateur'}
          </p>
          <p className="mt-2 text-sm sm:text-base md:text-lg">
            {dashboardData.programmeActuel ? (
              <>
                Vous suivez actuellement le programme <strong>{dashboardData.programmeActuel.nom}</strong>. 
                Vous avez terminé <strong>{dashboardData.seancesTerminees.length}</strong> séance(s). 
                {dashboardData.prochaineSeance ? (
                  <> Votre prochaine séance vous attend !</>
                ) : (
                  <> Félicitations, vous avez terminé toutes les séances !</>
                )}
              </>
            ) : (
              <>
                Bienvenue sur votre tableau de bord ! Commencez par choisir un programme d'entraînement 
                dans la section Programmes pour débuter votre parcours fitness.
              </>
            )}
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
                {dashboardData.programmeActuel ? (
                  <>
                    <p className="text-black text-center font-semibold text-xl pb-4">
                      {dashboardData.programmeActuel.nom}
                    </p>
                    <p className="text-black text-center font-normal text-lg pb-4">
                      Durée: {dashboardData.programmeActuel.duree} semaines
                    </p>
                    <p className="text-black text-center font-normal text-base pb-4">
                      Niveau: <span className="text-[#E22807] font-semibold">{dashboardData.programmeActuel.niveau}</span>
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500 text-center text-lg pb-4">
                    Aucun programme en cours
                  </p>
                )}
              </div>
              <div className="flex justify-center mt-6">
                <button 
                  onClick={() => dashboardData.programmeActuel ? navigate(`/detailsprogramms/${dashboardData.programmeActuel._id}`) : navigate('/programs')}
                  className="bg-[#E22807] hover:bg-[#c41c00] text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200"
                >
                  {dashboardData.programmeActuel ? 'Voir détails' : 'Choisir un programme'}
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow flex-1">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-black text-center font-bold text-2xl md:text-3xl pb-6">
                  Séances terminées
                </p>
                <p className="text-center font-semibold text-3xl text-[#E22807] pb-4">
                  {dashboardData.seancesTerminees.length}
                </p>
                {dashboardData.programmeActuel && (
                  <p className="text-black text-center font-normal text-lg">
                    sur {dashboardData.programmeActuel.seances?.length || 0} séances
                  </p>
                )}
              </div>
              <div className="flex justify-center mt-6">
                <button 
                  onClick={() => dashboardData.programmeActuel ? navigate('/seance-entrainement') : navigate('/programs')}
                  className="bg-[#E22807] hover:bg-[#c41c00] text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200"
                  disabled={!dashboardData.programmeActuel}
                >
                  {dashboardData.programmeActuel ? 'Voir séances' : 'Aucune séance'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bloc Prochaine Séance */}
        <div className="mt-6">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow">
            <p className="text-black text-center font-bold text-2xl md:text-3xl pb-6">
              Prochaine Séance
            </p>
            {dashboardData.prochaineSeance ? (
              <>
                <p className="text-black text-center font-semibold text-xl pb-4">
                  Séance {dashboardData.prochaineSeance.index + 1}
                </p>
                <p className="text-black text-center font-normal text-lg pb-4">
                  {dashboardData.prochaineSeance.seance.exercices?.length || 0} exercices
                </p>
                <div className="flex justify-center mt-6">
                  <button 
                    onClick={() => navigate(`/seance-entrainement/${dashboardData.programmeActuel._id}`)}
                    className="bg-[#E22807] hover:bg-[#c41c00] text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200"
                  >
                    Commencer maintenant
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-500 text-center text-lg pb-4">
                  {dashboardData.programmeActuel ? 'Toutes les séances terminées !' : 'Aucun programme en cours'}
                </p>
                <div className="flex justify-center mt-6">
                  <button 
                    onClick={() => navigate('/programs')}
                    className="bg-[#E22807] hover:bg-[#c41c00] text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition-colors duration-200"
                  >
                    Voir les programmes
                  </button>
                </div>
              </>
            )}
          </div>

        </div>

        {/* Bloc Profil original (en bas) */}
        <div className="flex mt-6">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow w-full max-w-3xl mx-auto flex flex-col items-center">
            <img src={profileIcon} alt="" className="w-20 h-20 sm:w-24 sm:h-24 mb-4" />
            <p className="text-black text-center font-bold text-2xl md:text-3xl pb-6">
              {dashboardData.user?.nom || 'Nom profil'}
            </p>

            <div className="border-b-2 border-black w-full mb-5"></div>
            <div className="flex flex-col text-[#E22807] font-bold gap-3 text-base sm:text-lg">
              <p>Email : <span className="text-black">
                {dashboardData.user?.email || 'Non défini'}
              </span></p>
              <p>Niveau : <span className="text-black">
                {dashboardData.user?.niveau === 'debutant' ? 'Débutant' : 
                 dashboardData.user?.niveau === 'intermediaire' ? 'Intermédiaire' : 
                 dashboardData.user?.niveau === 'avance' ? 'Avancé' : 'Non défini'}
              </span></p>
              <p>Objectifs : <span className="text-black">
                {dashboardData.user?.objectifs && dashboardData.user.objectifs.length > 0 ? 
                  dashboardData.user.objectifs.join(', ') : 'Non définis'}
              </span></p>
              <p>Programme en cours : <span className="text-black">
                {dashboardData.programmeActuel?.nom || 'Aucun programme'}
              </span></p>
              <p>Séances terminées : <span className="text-black">
                {dashboardData.seancesTerminees.length} séance{dashboardData.seancesTerminees.length !== 1 ? 's' : ''}
              </span></p>
              {dashboardData.programmeActuel && (
                <p>Progression : <span className="text-black">
                  {Math.round((dashboardData.seancesTerminees.length / (dashboardData.programmeActuel.seances?.length || 1)) * 100)}%
                </span></p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
