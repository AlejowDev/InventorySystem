import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilRoom } from '@coreui/icons';

import { clearAuth } from '../../services/auth';

// Importar las imágenes de avatar
import adminAvatar from './../../assets/images/corona.png';
import moderatorAvatar from './../../assets/images/reino.png';
import studentAvatar from './../../assets/images/buscar.png';
import superadminAvatar from './../../assets/images/apoyo.png';

const AppHeaderDropdown = () => {
  const navigate = useNavigate();

  // Obtener el rol del usuario desde el local storage
  const userRole = localStorage.getItem('role') || 'guest';

  // Determinar qué avatar mostrar según el rol
  let avatarSrc;
  switch (userRole) {
    case 'superadmin':
      avatarSrc = superadminAvatar;
      break;
    case 'admin':
      avatarSrc = adminAvatar;
      break;
    case 'moderator':
      avatarSrc = moderatorAvatar;
      break;
    case 'student':
      avatarSrc = studentAvatar;
      break;
    default:
      avatarSrc = studentAvatar; // Puedes poner una imagen por defecto aquí
      break;
  }

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

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatarSrc} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Cuenta</CDropdownHeader>
        <CDropdownItem href="/login" onClick={handleLogout}>
          <CIcon icon={cilRoom} className="me-2" />
          Cerrar sesión
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
