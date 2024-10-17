// src/navigation/moderatorNav.js
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilList, cilRoom } from '@coreui/icons';
import { CNavItem, CNavTitle, CDropdownItem } from '@coreui/react';

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

const moderatorNav = (navigate) => [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/moderator/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Usuarios',
  },
  {
    component: CNavItem,
    name: 'Lista de usuarios',
    to: '/moderator/users',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
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
    icon: <CIcon icon={cilRoom} className="me-2" />,
  }
];

export default moderatorNav;
