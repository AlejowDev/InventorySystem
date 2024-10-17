// AdminNewUsers.js
import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2' // Importar SweetAlert
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'

const AdminNewUsers = () => {
  const [formData, setFormData] = useState({
    document: '',
    name: '',
    email: '',
    phone: '',
    studentNumber: '',
    username: '',
    password: '',
    role: '',
    isTemporaryPassword: 1, // Valor por defecto para isTemporaryPassword
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Log para depurar
    console.log('Datos del formulario:', formData)

    // Validación de campos
    if (
      !formData.document ||
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.studentNumber ||
      !formData.username ||
      !formData.password ||
      !formData.role
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      })
      return
    }

    // Enviar datos al servidor
    axios
      .post('http://localhost:8081/api/admin/register', formData) // Asegúrate de que esta URL es correcta
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario creado exitosamente!',
        })
        setFormData({
          document: '',
          name: '',
          email: '',
          phone: '',
          studentNumber: '',
          username: '',
          password: '',
          role: '',
          isTemporaryPassword: 1, // Resetear el valor por defecto
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al crear el usuario',
        })
        console.error('Error creando usuario:', error)
      })
  }

  return (
    <CRow>
      <CCol xs={12} md={12}>
        <CCard className="mb-4">
          <CCardHeader>Crear Nuevo Usuario</CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="document">Documento</CFormLabel>
                <CFormInput
                  type="text"
                  id="document"
                  name="document"
                  value={formData.document}
                  onChange={handleChange}
                  placeholder="Ingresa el documento"
                  maxLength={11}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="name">Nombre</CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ingresa el nombre"
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="email">E-mail</CFormLabel>
                <CFormInput
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ingresa el correo electronico"
                  maxLength={100}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="phone">Celular</CFormLabel>
                <CFormInput
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ingresa el numero celular"
                  maxLength={11}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="studentNumber">Codigo estudiantil</CFormLabel>
                <CFormInput
                  type="text"
                  id="studentNumber"
                  name="studentNumber"
                  value={formData.studentNumber}
                  onChange={handleChange}
                  placeholder="Ingresa el codigo estudiantil"
                  maxLength={100}
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="username">Username</CFormLabel>
                <CFormInput
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Ingresa el nombre de usuario"
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="password">Contraseña Temporal</CFormLabel>
                <CFormInput
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingresa la contraseña temporal"
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="role">Rol</CFormLabel>
                <CFormSelect id="role" name="role" value={formData.role} onChange={handleChange}>
                  <option value="" disabled>
                    Selecciona un rol
                  </option>
                  <option value="student">Estudiante</option>
                  <option value="moderator">Moderador</option>
                  <option value="admin">Administrador</option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CButton type="submit" className="custom-btn btn-md">
                  Crear Usuario
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AdminNewUsers
