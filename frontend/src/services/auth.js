// src/services/auth.js

// Función para guardar el token en localStorage
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

// Función para obtener el token de localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Función para guardar el rol del usuario en localStorage
export const setUserRole = (role) => {
    localStorage.setItem('role', role);
};

// Función para obtener el rol del usuario de localStorage
export const getUserRole = () => {
    return localStorage.getItem('role');
};

// Función para limpiar la autenticación (eliminar token y rol)
export const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};
