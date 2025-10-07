import { API_ENDPOINTS } from '../config/api';

// Fonction utilitaire pour vérifier si l'utilisateur est connecté
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

// Fonction pour obtenir le token utilisateur
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Fonction pour supprimer le token (déconnexion)
export const removeAuthToken = () => {
  localStorage.removeItem("token");
};

// Fonction pour sauvegarder le token
export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

// Fonction pour vérifier la validité du token côté serveur
export const verifyToken = async () => {
  const token = getAuthToken();

  if (!token) {
    return false;
  }

  try {
    const response = await fetch(API_ENDPOINTS.auth.profile, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return true;
    } else {
      // Token invalide ou expiré, le supprimer
      removeAuthToken();
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error);
    // En cas d'erreur réseau, garder le token mais retourner false
    return false;
  }
};
