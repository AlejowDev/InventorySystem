// src/services/auth.js

// Función para guardar el token en localStorage
export const setToken = (token) => {
    try {
        localStorage.setItem('token', token);
    } catch (error) {
        console.error('Error al guardar el token:', error);
    }
};

// Función para obtener el token de localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

export const getUserTemporaryPasswordStatus = () => {
    return localStorage.getItem('isTemporaryPassword') === '1'; // Asegúrate de que el valor sea un booleano
};

// Función para verificar si el token existe
export const hasToken = () => {
    return !!getToken();
};

// Función para guardar el rol del usuario en localStorage
export const setUserRole = (role) => {
    try {
        localStorage.setItem('role', role);
    } catch (error) {
        console.error('Error al guardar el rol del usuario:', error);
    }
};

// Función para obtener el rol del usuario de localStorage
export const getUserRole = () => {
    return localStorage.getItem('role');
};

// Función para verificar si el rol existe
export const hasUserRole = () => {
    return !!getUserRole();
};

// Función para limpiar la autenticación (eliminar token y rol)
export const clearAuth = () => {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    } catch (error) {
        console.error('Error al limpiar la autenticación:', error);
    }
};

// Función para actualizar el rol del usuario
export const updateUserRole = (newRole) => {
    setUserRole(newRole);
};
