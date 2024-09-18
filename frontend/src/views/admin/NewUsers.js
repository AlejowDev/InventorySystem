// AdminNewUsers.js
import React, { useState } from 'react'
import axios from 'axios'
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
  CAlert,
} from '@coreui/react'

const AdminNewUsers = () => {
  const [formData, setFormData] = useState({
    document: '',
    name: '',
    username: '',
    password: '',
    role: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Log para depurar
    console.log('Datos del formulario:', formData)

    // Validación de campos
    if (
      !formData.document ||
      !formData.name ||
      !formData.username ||
      !formData.password ||
      !formData.role
    ) {
      setError('Todos los campos son obligatorios')
      return
    }

    // Enviar datos al servidor
    axios
      .post('http://localhost:8081/api/admin/register', formData) // Asegúrate de que esta URL es correcta
      .then((response) => {
        setSuccess('Usuario creado exitosamente!')
        setFormData({
          document: '',
          name: '',
          username: '',
          password: '',
          role: '',
        })
      })
      .catch((error) => {
        setError('Hubo un error al crear el usuario')
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
              {error && <CAlert color="danger">{error}</CAlert>}
              {success && <CAlert color="success">{success}</CAlert>}

              <div className="mb-3">
                <CFormLabel htmlFor="document">Documento</CFormLabel>
                <CFormInput
                  type="text"
                  id="document"
                  name="document"
                  value={formData.document}
                  onChange={handleChange}
                  placeholder="Ingresa el documento"
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
              <CFormLabel htmlFor="password">Rol</CFormLabel>
                <CFormSelect id="role" name="role" value={formData.role} onChange={handleChange}>
                  <option value="" disabled>Selecciona un rol</option>
                  <option value="student">Estudiante</option>
                  <option value="moderator">Moderador</option>
                  <option value="admin">Administrador</option>
                </CFormSelect>
              </div>

              <CButton type="submit" color="primary">
                Crear Usuario
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AdminNewUsers
