// src/navigation/moderatorNav.js
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilList, cilRoom, cilBook, cilDevices } from '@coreui/icons';
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
    name: 'PRESTAMOS',
  },
  {
    component: CNavItem,
    name: 'Agenda de Préstamos',
    to: '/moderator/loans',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Listas',
  },
  {
    component: CNavItem,
    name: 'Estudiantes',
    to: '/moderator/users',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'INVENTARIO',
  },
  {
    component: CNavItem,
    name: 'Lista de Inventario',
    to: '/moderator/tools',
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

export default moderatorNav;
