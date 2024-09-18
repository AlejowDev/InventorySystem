import React from 'react'
import { Navigate } from 'react-router-dom'
import { getToken } from './services/auth' // Usamos getToken para verificar el estado de autenticación

const ProtectedRoute = ({ children }) => {
  const token = getToken(); // Obtener el token desde localStorage

  if (!token) {
    // Si no hay token, redirigir a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  // Si hay token, mostrar el contenido protegido
  return children;
}

export default ProtectedRoute;
