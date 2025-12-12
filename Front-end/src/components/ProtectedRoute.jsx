import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_URL } from '../config/api';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          return;
        }

        const data = await response.json();
        setIsAuthenticated(true);
        setIsAdmin(data.user.role === 'admin');
        
      } catch (error) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  
  if (isAuthenticated === null) {
    return <div>Chargement...</div>;
  }

  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
