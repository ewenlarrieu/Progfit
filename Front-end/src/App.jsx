import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastProvider } from './context/ToastContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Programs from './pages/Programs';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import DetailsProgramms from './pages/DetailsProgramms';
import SeanceEntrainement from './pages/SeanceEntrainement';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/programs" element={<ProtectedRoute><Programs /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/detailsprogramms" element={<ProtectedRoute><DetailsProgramms /></ProtectedRoute>} />
          <Route path="/detailsprogramms/:id" element={<ProtectedRoute><DetailsProgramms /></ProtectedRoute>} />
          <Route path="/seance-entrainement" element={<ProtectedRoute><SeanceEntrainement /></ProtectedRoute>} />
          <Route path="/seance-entrainement/:id" element={<ProtectedRoute><SeanceEntrainement /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
    </ToastProvider>
  );
}

export default App;
