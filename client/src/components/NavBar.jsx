import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo2 from "./Logo2";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

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
                onClick={() => navigate("/SeanceEntrainement")}
                className={`w-full text-left p-3 font-semibold rounded transition-colors ${
                  location.pathname === "/SeanceEntrainement"
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

      {/* Menu Mobile */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="fixed inset-0 z-50 bg-gray-200 md:hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-black">
              <Logo2 />
              <button onClick={() => setIsOpen(false)} className="text-black p-2">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setIsOpen(false);
                    }}
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
                    onClick={() => {
                      navigate("/programs");
                      setIsOpen(false);
                    }}
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
                    onClick={() => {
                      navigate("/detailsprogramms");
                      setIsOpen(false);
                    }}
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
                    onClick={() => {
                      navigate("/SeanceEntrainement");
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3 font-semibold rounded transition-colors ${
                      location.pathname === "/SeanceEntrainement"
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
              </ul>
            </nav>

            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="p-4 text-black font-semibold hover:text-[#E22807] border-t-2 border-black transition-colors text-left"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Déconnexion
            </button>
          </div>
        </>
      )}
    </>
  );
}
