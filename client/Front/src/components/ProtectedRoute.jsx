import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated, verifyToken } from '../utils/auth'

// Composant pour protéger les routes qui nécessitent une authentification
const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isValid, setIsValid] = useState(false)
  
  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated()) {
        setIsLoading(false)
        setIsValid(false)
        return
      }
      
      // Vérifier la validité du token
      const tokenValid = await verifyToken()
      setIsValid(tokenValid)
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])
  
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E22807]"></div>
      </div>
    )
  }
  
  
  if (!isValid) {
    return <Navigate to="/login" replace />
  }
  
  
  return children
}

export default ProtectedRoute