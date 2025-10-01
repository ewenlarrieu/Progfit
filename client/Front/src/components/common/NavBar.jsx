import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Définition des liens de navigation
  const navLinks = [
    { path: "/dashboard", label: "Tableau de bord", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" },
    { path: "/programs", label: "Programme", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { path: "/detailsprogramms", label: "Détail programme", icon: "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" },
    { path: "/SeanceEntrainement", label: "Séance d'entrainement", icon: "M4 8h16M4 16h16M8 4v16M16 4v16" },
    { divider: true },
    { path: "/profile", label: "Mon compte", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/#/login";
  };

  // Style conditionnel pour item actif
  const linkClasses = (path) =>
    `flex items-center p-3 font-semibold transition-colors ${
      isActive(path) ? "text-[#E22807] underline" : "text-black hover:text-[#E22807]"
    }`;

  // Rendu des liens
  const renderLinks = (isMobile = false) =>
    navLinks.map((link, idx) =>
      link.divider ? (
        <div key={idx} className="border-b-2 border-black -mx-4 my-2"></div>
      ) : (
        <li key={link.path}>
          <button
            className={linkClasses(link.path)}
            style={{ fontFamily: "Poppins, sans-serif" }}
            onClick={() => {
              navigate(link.path);
              if (isMobile) setIsOpen(false);
            }}
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
            </svg>
            {link.label}
          </button>
        </li>
      )
    );

  return (
    <>
      {/* Topbar Mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gray-200 shadow-md md:hidden">
        <Logo />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black focus:outline-none"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar Desktop */}
      <div className="fixed top-0 left-0 hidden h-screen w-64 flex-col bg-gray-200 shadow-lg md:flex z-40">
        <div className="p-6 border-b-2 border-black">
          <Logo />
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">{renderLinks()}</ul>
        </nav>
        <button
          className="flex items-center p-3 text-black font-semibold cursor-pointer mb-6 ml-4"
          style={{ fontFamily: "Poppins, sans-serif" }}
          onClick={handleLogout}
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Déconnexion
        </button>
      </div>

      {/* Overlay Mobile Menu */}
      {isOpen && (
            <div className="fixed top-0 left-0 z-50 h-screen w-64 bg-gray-200 shadow-lg flex flex-col">
            <div className="p-6 border-b-2 border-black flex justify-between items-center">
              <Logo />
              <button
                onClick={() => setIsOpen(false)}
                className="text-black focus:outline-none ml-2"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">{renderLinks(true)}</ul>
            </nav>
            <button
              className="flex items-center p-3 text-black font-semibold cursor-pointer mb-6 ml-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Déconnexion
            </button>
          </div>
        
      )}
    </>
  );
}
