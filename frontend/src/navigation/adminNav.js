// src/navigation/adminNav.js
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilDrop, cilPencil, cilPuzzle } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const adminNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
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
];

export default adminNav;
