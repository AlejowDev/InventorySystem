import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilBolt, cilGlobeAlt } from '@coreui/icons';

const ModeratorUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/users')
      .then((response) => {
        const allUsers = response.data;
        const nonAdminUsers = allUsers.filter((user) => user.role == 'student');
        setUsers(allUsers);
        setFilteredUsers(nonAdminUsers);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

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
            <CCardHeader>Estudiantes</CCardHeader>
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
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ModeratorUsers;
