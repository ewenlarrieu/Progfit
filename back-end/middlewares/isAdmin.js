export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentification requise" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Accès administrateur requis" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
