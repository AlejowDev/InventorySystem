import React from 'react'
import ProtectedRoute from './ProtectedRoute'
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Admin pages
const AdminDashboard = React.lazy(() => import('./views/admin/Dashboard'))
const AdminUsers = React.lazy(() => import('./views/admin/Users'))
const AdminNewUsers = React.lazy(() => import('./views/admin/NewUsers'))
const AdminTools = React.lazy(() => import('./views/admin/Tools'))
const AdminLoans = React.lazy(() => import('./views/admin/Loans'))

// Admin pages
const SuperAdminDashboard = React.lazy(() => import('./views/superadmin/Dashboard'))
const SuperAdminUsers = React.lazy(() => import('./views/superadmin/Users'))
const SuperAdminNewUsers = React.lazy(() => import('./views/superadmin/NewUsers'))
const SuperAdminTools = React.lazy(() => import('./views/superadmin/Tools'))
const SuperAdminLoans = React.lazy(() => import('./views/superadmin/Loans'))

//Moderator pages
const ModeratorDashboard = React.lazy(() => import('./views/moderator/Dashboard'))
const ModeratorUsers = React.lazy(() => import('./views/moderator/Users'))
const ModeratorTools = React.lazy(() => import('./views/moderator/Tools'))
const ModeratorLoans = React.lazy(() => import('./views/moderator/Loans'))

//Student pages
const StudentDashboard = React.lazy(() => import('./views/student/Dashboard'))
const StudentLoans = React.lazy(() => import('./views/student/Loans'))
const StudentNewLoan = React.lazy(() => import('./views/student/NewLoan'))

const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

// Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  // SuperAdmin
  {
    path: '/superadmin/dashboard',
    name: 'SuperAdmin Dashboard',
    element: (
      <ProtectedRoute allowedRoles={['superadmin']}>
        <DefaultLayout>
          <SuperAdminDashboard />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/superadmin/users',
    name: 'SuperAdmin Users',
    element: (
      <ProtectedRoute allowedRoles={['superadmin']}>
        <DefaultLayout>
        <SuperAdminUsers />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/superadmin/newusers',
    name: 'SuperAdmin NewUsers',
    element: (
      <ProtectedRoute allowedRoles={['superadmin']}>
        <DefaultLayout>
        <SuperAdminNewUsers />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/superadmin/tools',
    name: 'SuperAdmin Tools',
    element: (
      <ProtectedRoute allowedRoles={['superadmin']}>
        <DefaultLayout>
        <SuperAdminTools />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/superadmin/loans',
    name: 'SuperAdmin Loans',
    element: (
      <ProtectedRoute allowedRoles={['superadmin']}>
        <DefaultLayout>
        <SuperAdminLoans />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  // Admin
  {
    path: '/admin/dashboard',
    name: 'Admin Dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DefaultLayout>
          <AdminDashboard />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    name: 'Admin Users',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DefaultLayout>
        <AdminUsers />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/newusers',
    name: 'Admin NewUsers',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DefaultLayout>
        <AdminNewUsers />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/tools',
    name: 'Admin Tools',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DefaultLayout>
        <AdminTools />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/loans',
    name: 'Admin Loans',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <DefaultLayout>
        <AdminLoans />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  // Moderator
  {
    path: '/moderator/dashboard',
    name: 'Moderator Dashboard',
    element: (
      <ProtectedRoute allowedRoles={['moderator']}>
        <DefaultLayout>
        <ModeratorDashboard />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/moderator/users',
    name: 'Moderator Users',
    element: (
      <ProtectedRoute allowedRoles={['moderator']}>
        <DefaultLayout>
        <ModeratorUsers />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/moderator/tools',
    name: 'Moderator Tools',
    element: (
      <ProtectedRoute allowedRoles={['moderator']}>
        <DefaultLayout>
        <ModeratorTools />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/moderator/loans',
    name: 'Moderator Loans',
    element: (
      <ProtectedRoute allowedRoles={['moderator']}>
        <DefaultLayout>
        <ModeratorLoans />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },

  // Student
  {
    path: '/student/dashboard',
    name: 'Student Dashboard',
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <DefaultLayout>
        <StudentDashboard />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/loans',
    name: 'Student Loans',
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <DefaultLayout>
        <StudentLoans />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/student/newloan',
    name: 'Student NewLoan',
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <DefaultLayout>
        <StudentNewLoan />
        </DefaultLayout>
      </ProtectedRoute>
    ),
  },

  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]
export default routes
