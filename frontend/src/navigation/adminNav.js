// src/navigation/adminNav.js
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilList, cilUserFollow, cilRoom, cilDevices, cilBook } from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle, CDropdownItem } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../services/auth'; // Ajusta la importación según tu estructura de proyecto

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('isTemporaryPassword');
  localStorage.removeItem('document');
  
  Swal.fire({
    icon: 'success',
    title: 'Sesión cerrada',
    text: 'Has cerrado sesión exitosamente.',
  });
};

// Define una función que devuelve el arreglo de navegación con el botón de cerrar sesión
const adminNav = (navigate) => [
  {
    component: CNavItem,
    name: 'Inicio',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'PRESTAMOS',
  },
  {
    component: CNavItem,
    name: 'Agenda de Préstamos',
    to: '/admin/loans',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Usuarios',
  },
  {
    component: CNavItem,
    name: 'Lista de Usuarios',
    to: '/admin/users',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Nuevo Usuario',
    to: '/admin/newusers',
    icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'INVENTARIO',
  },
  {
    component: CNavItem,
    name: 'Lista de Inventario',
    to: '/admin/tools',
    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Salir',
  },
  {
    component: CDropdownItem,
    name: 'Cerrar sesión',
    href: '/login',
    onClick: handleLogout, // Llama a handleLogout al hacer clic
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
  }
];

export default adminNav;
