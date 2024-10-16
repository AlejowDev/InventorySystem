// src/navigation/moderatorNav.js
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilList, cilPuzzle, cilRoom } from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle, CDropdownItem } from '@coreui/react';
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
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      { component: CNavItem, name: 'Accordion', to: '/base/accordion' },
      { component: CNavItem, name: 'Breadcrumb', to: '/base/breadcrumbs' },
      { component: CNavItem, name: 'Cards', to: '/base/cards' },
      { component: CNavItem, name: 'Carousel', to: '/base/carousels' },
      { component: CNavItem, name: 'Collapse', to: '/base/collapses' },
      { component: CNavItem, name: 'List group', to: '/base/list-groups' },
      { component: CNavItem, name: 'Navs & Tabs', to: '/base/navs' },
      { component: CNavItem, name: 'Pagination', to: '/base/paginations' },
      { component: CNavItem, name: 'Placeholders', to: '/base/placeholders' },
      { component: CNavItem, name: 'Popovers', to: '/base/popovers' },
      { component: CNavItem, name: 'Progress', to: '/base/progress' },
      { component: CNavItem, name: 'Spinners', to: '/base/spinners' },
      { component: CNavItem, name: 'Tables', to: '/base/tables' },
      { component: CNavItem, name: 'Tabs', to: '/base/tabs' },
      { component: CNavItem, name: 'Tooltips', to: '/base/tooltips' },
    ],
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
