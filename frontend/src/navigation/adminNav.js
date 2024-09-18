// src/navigation/adminNav.js
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilList, cilUserFollow, cilRoom } from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle, CDropdownItem } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../services/auth'; // Ajusta la importación según tu estructura de proyecto

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
    name: 'Usuarios',
  },
  {
    component: CNavItem,
    name: 'Lista de usuarios',
    to: '/admin/users',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Nuevo usuario',
    to: '/admin/newusers',
    icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Salir',
  },
  {
    component: CDropdownItem,
    name: 'Cerrar sesión',
    href: '#',
    onClick: () => {
      clearAuth();
      navigate('/login');
    },
    icon: <CIcon icon={cilRoom} className="me-2" />,
  }
];

export default adminNav;
