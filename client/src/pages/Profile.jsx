import React, { useState } from "react";
import NavBar from '../components/NavBar';


const Profile = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavBar/>
      <div className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8 pt-20 md:pt-8">
        {/* Contenu du profil */}
      </div>
    </div>
  );
};

export default Profile;