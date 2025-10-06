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
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';

// Import des composants communs
import ProtectedRoute from './components/ProtectedRoute';



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
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          
          {/* Pages principales (protégées - nécessitent une authentification) */}
          <Route path="/programs" element={
            <ProtectedRoute>
              <Programs />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
           <Route path="/detailsprogramms/:id" element={
            <ProtectedRoute>
              <DetailsProgramms />
            </ProtectedRoute>
          } />
          <Route path="/detailsprogramms" element={
            <ProtectedRoute>
              <DetailsProgramms />
            </ProtectedRoute>
          } />
          <Route path="/seance-entrainement/:id" element={
            <ProtectedRoute>
              <SeanceEntrainement />
            </ProtectedRoute>
          } />
          <Route path="/seance-entrainement" element={
            <ProtectedRoute>
              <SeanceEntrainement />
            </ProtectedRoute>
          } />
          <Route path="/SeanceEntrainement" element={
            <ProtectedRoute>
              <SeanceEntrainement />
            </ProtectedRoute>
          } />
          
          {/* Redirection par défaut vers login pour les routes non trouvées */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
