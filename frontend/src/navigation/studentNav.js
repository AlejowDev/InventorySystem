// src/navigation/studentNav.js
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilBook, cilRoom, cilCart } from '@coreui/icons'; // Usa cilUser si cilLogout no está disponible
import { CNavItem, CNavTitle, CDropdownItem } from '@coreui/react';
import { clearAuth } from '../services/auth';

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

const studentNav = (navigate) => [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/student/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'PRESTAMOS',
  },
  {
    component: CNavItem,
    name: 'Nuevo préstamo',
    to: '/student/newloan',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Mis préstamos',
    to: '/student/loans',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CDropdownItem,
    name: 'Cerrar sesión',
    href: '/login',
    onClick: handleLogout, // Llama a handleLogout al hacer clic
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
  }
];

export default studentNav;
