import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getUserRole, getUserTemporaryPasswordStatus } from './services/auth'; // Actualiza la importación según tu archivo de servicios

const ProtectedRoute = ({ children }) => {
  const token = getToken(); // Obtener el token desde localStorage
  const role = getUserRole(); // Obtener el rol del usuario
  const isTemporaryPassword = getUserTemporaryPasswordStatus(); // Verificar si tiene contraseña temporal

  if (!token) {
    // Si no hay token, redirigir a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  // Redirigir a cambiar la contraseña si se está usando una contraseña temporal
  if (isTemporaryPassword) {
    return <Navigate to="/change-password" />;
  }

  // Si hay token y no es contraseña temporal, mostrar el contenido protegido
  return children;
};

export default ProtectedRoute;
