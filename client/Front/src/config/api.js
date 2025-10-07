// Configuration des URLs de l'API selon l'environnement
const API_CONFIG = {
  development: {
    baseURL: "http://localhost:5000",
  },
  production: {
    baseURL: "https://progfit.onrender.com",
  },
};

// Détection automatique de l'environnement
const isDevelopment = 
  window.location.hostname === "localhost" || 
  window.location.hostname === "127.0.0.1";
const environment = isDevelopment ? "development" : "production";

export const API_BASE_URL = API_CONFIG[environment].baseURL;

// URL complète de l'API
export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    profile: `${API_BASE_URL}/api/auth/profile`,
    forgotPassword: `${API_BASE_URL}/api/auth/forgot-password`,
    resetPassword: (token) =>
      `${API_BASE_URL}/api/auth/reset-password/${token}`,
    updateProfile: `${API_BASE_URL}/api/auth/update-profile`,
  },
  programmes: {
    getAll: `${API_BASE_URL}/api/programmes`,
    getById: (id) => `${API_BASE_URL}/api/programmes/${id}`,
  },
  userProgrammes: {
    inscrire: `${API_BASE_URL}/api/user-programmes/inscrire`,
    actuel: `${API_BASE_URL}/api/user-programmes/actuel`,
    terminer: `${API_BASE_URL}/api/user-programmes/terminer`,
    abandonner: `${API_BASE_URL}/api/user-programmes/abandonner`,
    terminerSeance: `${API_BASE_URL}/api/user-programmes/seance/terminer`,
    semaineSuivante: `${API_BASE_URL}/api/user-programmes/semaine-suivante`,
  },
};

export default API_BASE_URL;
