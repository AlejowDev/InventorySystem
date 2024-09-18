// src/navigation/studentNav.js
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilDrop, cilPencil, cilPuzzle, cilNotes, cilChartPie, cilStar, cilBell } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const studentNav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/student/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
];

export default studentNav;
