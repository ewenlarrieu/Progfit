import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo2 from "./Logo2";
import { API_URL } from '../config/api';

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`${API_URL}/api/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.user.role);
        }
      } catch (error) {
      
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <>
      {/* Topbar Mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gray-200 shadow-md md:hidden">
        <Logo2 />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black p-2"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

     
      <div className="fixed top-0 left-0 hidden h-screen w-64 flex-col bg-gray-200 shadow-lg md:flex z-40">
        <div className="p-6 border-b-2 border-black">
          <Logo2 />
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate("/dashboard")}
                className={`w-full text-left p-3 font-semibold rounded transition-colors ${
                  location.pathname === "/" || location.pathname === "/dashboard"
                    ? "text-[#E22807] bg-white" 
                    : "text-black hover:text-[#E22807] hover:bg-white/50"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Tableau de bord
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/programs")}
                className={`w-full text-left p-3 font-semibold rounded transition-colors ${
                  location.pathname === "/programs"
                    ? "text-[#E22807] bg-white" 
                    : "text-black hover:text-[#E22807] hover:bg-white/50"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Programme
              </button>
            </li>


            <li>
              <button
                onClick={() => navigate("/detailsprogramms")}
                className={`w-full text-left p-3 font-semibold rounded transition-colors ${
                  location.pathname === "/detailsprogramms"
                    ? "text-[#E22807] bg-white" 
                    : "text-black hover:text-[#E22807] hover:bg-white/50"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Détail programme
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/seance-entrainement")}
                className={`w-full text-left p-3 font-semibold rounded transition-colors ${
                  location.pathname === "/seance-entrainement" || location.pathname.startsWith("/seance-entrainement/")
                    ? "text-[#E22807] bg-white" 
                    : "text-black hover:text-[#E22807] hover:bg-white/50"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Séance d'entrainement
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate("/profile")}
                className={`w-full text-left p-3 font-semibold rounded transition-colors ${
                  location.pathname === "/profile"
                    ? "text-[#E22807] bg-white" 
                    : "text-black hover:text-[#E22807] hover:bg-white/50"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Mon compte
              </button>
            </li>

            {userRole === "admin" && (
              <li>
                <button
                  onClick={() => navigate("/admin")}
                  className={`w-full text-left p-3 font-semibold rounded transition-colors ${
                    location.pathname === "/admin"
                      ? "text-[#E22807] bg-white" 
                      : "text-black hover:text-[#E22807] hover:bg-white/50"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Admin
                </button>
              </li>
            )}
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="p-4 text-black font-semibold hover:text-[#E22807] border-t-2 border-black transition-colors text-left"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Déconnexion
        </button>
      </div>

      
      {isOpen && (
        <div className="fixed top-[60px] left-0 right-0 z-40 bg-gray-200 md:hidden shadow-lg border-b-2 border-black">
          <nav className="p-4 max-h-[calc(100vh-60px)] overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setIsOpen(false);
                  }}
                  className={`w-full text-center p-3 font-semibold rounded transition-colors ${
                    location.pathname === "/" || location.pathname === "/dashboard"
                      ? "text-[#E22807] bg-white" 
                      : "text-black hover:text-[#E22807] hover:bg-white/50"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Tableau de bord
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    navigate("/programs");
                    setIsOpen(false);
                  }}
                  className={`w-full text-center p-3 font-semibold rounded transition-colors ${
                    location.pathname === "/programs"
                      ? "text-[#E22807] bg-white"
                      : "text-black hover:text-[#E22807] hover:bg-white/50"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Programme
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    navigate("/detailsprogramms");
                    setIsOpen(false);
                  }}
                  className={`w-full text-center p-3 font-semibold rounded transition-colors ${
                    location.pathname === "/detailsprogramms" || location.pathname.startsWith("/detailsprogramms/")
                      ? "text-[#E22807] bg-white"
                      : "text-black hover:text-[#E22807] hover:bg-white/50"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Détail programme
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    navigate("/seance-entrainement");
                    setIsOpen(false);
                  }}
                  className={`w-full text-center p-3 font-semibold rounded transition-colors ${
                    location.pathname === "/seance-entrainement" || location.pathname.startsWith("/seance-entrainement/")
                      ? "text-[#E22807] bg-white" 
                      : "text-black hover:text-[#E22807] hover:bg-white/50"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Séance d'entrainement
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsOpen(false);
                  }}
                  className={`w-full text-center p-3 font-semibold rounded transition-colors ${
                    location.pathname === "/profile"
                      ? "text-[#E22807] bg-white" 
                      : "text-black hover:text-[#E22807] hover:bg-white/50"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Mon compte
                </button>
              </li>

              {userRole === "admin" && (
                <li>
                  <button
                    onClick={() => {
                      navigate("/admin");
                      setIsOpen(false);
                    }}
                    className={`w-full text-center p-3 font-semibold rounded transition-colors ${
                      location.pathname === "/admin"
                        ? "text-[#E22807] bg-white" 
                        : "text-black hover:text-[#E22807] hover:bg-white/50"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Admin
                  </button>
                </li>
              )}

              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-center p-3 font-semibold rounded transition-colors text-black hover:text-[#E22807] hover:bg-white/50 border-t-2 border-black mt-2 pt-4"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Déconnexion
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
