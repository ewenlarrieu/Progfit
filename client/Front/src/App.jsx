import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import des pages
import Login from './pages/Login';
import Register from './pages/Register';
import Programs from './pages/Programs';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

// Import des composants communs
import Layout from './components/common/Layout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Pages d'authentification (sans header/footer) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Pages principales (avec header/footer) */}
          <Route path="/programs" element={
            <Layout>
              <Programs />
            </Layout>
          } />
          <Route path="/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/profile" element={
            <Layout>
              <Profile />
            </Layout>
          } />
          
          {/* Redirection par défaut vers la page d'accueil HTML */}
          <Route path="*" element={<RedirectToHome />} />
        </Routes>
      </div>
    </Router>
  );
}

// Composant pour rediriger vers la page d'accueil HTML
const RedirectToHome = () => {
  React.useEffect(() => {
    window.location.href = '/index.html';
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirection vers la page d'accueil...</p>
      </div>
    </div>
  );
};

export default App;
