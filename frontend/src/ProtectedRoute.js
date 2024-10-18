import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getUserRole, getUserTemporaryPasswordStatus } from './services/auth'; // Actualiza la importación según tu archivo de servicios

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = getToken(); // Obtener el token desde localStorage
  const userRole = getUserRole(); // Obtener el rol del usuario
  const isTemporaryPassword = getUserTemporaryPasswordStatus(); // Verificar si tiene contraseña temporal

  if (!token) {
    // Si no hay token, redirigir a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  // Verificar si el rol del usuario está permitido para la ruta
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />; // Redirigir a la página 404 si no está autorizado
  }

  // Redirigir a cambiar la contraseña si se está usando una contraseña temporal
  if (isTemporaryPassword) {
    return <Navigate to="/change-password" />;
  }

  // Si hay token y no es contraseña temporal, mostrar el contenido protegido
  return children;
};

export default ProtectedRoute;
