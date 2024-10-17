import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilBolt, cilGlobeAlt, cilPencil, cilTrash } from '@coreui/icons';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    document: '',
    name: '',
    email: '',
    phone: '',
    studentNumber: '',
    username: '',
    role: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/users')
      .then((response) => {
        const allUsers = response.data;
        const nonAdminUsers = allUsers.filter((user) => user.role !== 'admin');
        setUsers(allUsers);
        setFilteredUsers(nonAdminUsers);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleEdit = (userDocument) => {
    const user = filteredUsers.find((user) => user.document === userDocument);
    setCurrentUser(user);
    setFormData({ ...user });
    setEditModalVisible(true);
  };

  const handleDelete = (userDocument) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este usuario!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8081/api/users/${userDocument}`)
          .then(() => {
            setFilteredUsers(filteredUsers.filter((user) => user.document !== userDocument));
            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          });
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:8081/api/users/${formData.document}`, formData)
      .then(() => {
        setFilteredUsers(filteredUsers.map((user) =>
          user.document === formData.document ? formData : user
        ));
        setEditModalVisible(false);
        Swal.fire('Actualizado', 'El usuario ha sido actualizado.', 'success');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
      });
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return cilGlobeAlt;
      case 'moderator':
        return cilBolt;
      default:
        return cilUser;
    }
  };

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Usuarios</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap text-center">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">Documento</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Nombre</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Celular</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Codigo estudiantil</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Username</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Rol</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody className="text-nowrap text-center">
                  {filteredUsers.map((user, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{user.document}</CTableDataCell>
                      <CTableDataCell>{user.name}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>{user.phone}</CTableDataCell>
                      <CTableDataCell>{user.studentNumber}</CTableDataCell>
                      <CTableDataCell>{user.username}</CTableDataCell>
                      <CTableDataCell>
                        <CIcon size="sm" icon={getRoleIcon(user.role)} /> {user.role}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className="custom-btn-edit me-2"
                          size="sm"
                          onClick={() => handleEdit(user.document)}
                        >
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton
                          className="custom-btn-delete me-2"
                          size="sm"
                          onClick={() => handleDelete(user.document)}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal de edición */}
      <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Editar Usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              label="Documento"
              name="document"
              value={formData.document}
              onChange={handleInputChange}
              disabled
            />
            <CFormInput
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <CFormInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <CFormInput
              label="Numero Celular"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <CFormInput
              label="Codigo estudiantil"
              name="studentNumber"
              value={formData.studentNumber}
              onChange={handleInputChange}
            />
            <CFormInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <div className="mb-3">
              <CFormLabel htmlFor="role">Rol</CFormLabel>
              <CFormSelect
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="" disabled>Selecciona un rol</option>
                <option value="student">Estudiante</option>
                <option value="moderator">Moderador</option>
                <option value="admin">Administrador</option>
              </CFormSelect>
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton className='custom-btn' onClick={handleSave}>
            Guardar cambios
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default AdminUsers;
