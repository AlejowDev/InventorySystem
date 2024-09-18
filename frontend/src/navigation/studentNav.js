// src/navigation/studentNav.js
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilUser, cilRoom } from '@coreui/icons'; // Usa cilUser si cilLogout no está disponible
import { CNavItem, CNavTitle } from '@coreui/react';
import { clearAuth } from '../services/auth';

const studentNav = (navigate) => [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/student/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Cerrar sesión',
    href: '#',
    onClick: () => {
      clearAuth();
      navigate('/login');
    },
    icon: <CIcon icon={cilRoom} className="me-2" />, // Cambiado a cilUser
  },
];

export default studentNav;
