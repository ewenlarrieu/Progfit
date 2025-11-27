import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

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


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detailsprogramms/:id" element={<DetailsProgramms />} />
          <Route path="/seance-entrainement/:id" element={<SeanceEntrainement />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
