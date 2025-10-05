import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import des pages
import Login from './pages/Login';
import Register from './pages/Register';
import Programs from './pages/Programs';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import DetailsProgramms from './pages/DetailsProgramms';
import SeanceEntrainement from './pages/SeanceEntrainement';

// Import des composants communs



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route par défaut */}
          <Route path="/" element={<Login />} />
          
          {/* Pages d'authentification (sans header/footer) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/ForgotPassword' element={<ForgotPassword/>} />
          <Route path='/reset-password/:token' element={<ResetPassword/>} />
          
          {/* Pages principales (avec header/footer) */}
          <Route path="/programs" element={
          
              <Programs />
        
          } />
          <Route path="/dashboard" element={
           
              <Dashboard />
           
          } />
          <Route path="/profile" element={
           
              <Profile />
          
          } />
           <Route path="/detailsprogramms/:id" element={
           
              <DetailsProgramms />
          
          } />
          <Route path="/detailsprogramms" element={
           
              <DetailsProgramms />
          
          } />
          <Route path="/seance-entrainement/:id" element={
           
              <SeanceEntrainement />
          
          } />
          <Route path="/seance-entrainement" element={
           
              <SeanceEntrainement />
          
          } />
          <Route path="/SeanceEntrainement" element={
           
              <SeanceEntrainement />
          
          } />
          
          {/* Redirection par défaut vers login pour les routes non trouvées */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
