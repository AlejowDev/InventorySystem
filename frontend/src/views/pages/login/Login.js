import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import './Login.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

// Importa la imagen aquí
import logo from '../../../assets/images/logo.png'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', {
        username,
        password,
      })
      const { token, role } = response.data

      // Guardar el token en el localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Inicio de sesión exitoso.',
        timer: 1500,
        timerProgressBar: true,
      })

      // Redirigir al dashboard según el rol
      setTimeout(() => {
        switch (role) {
          case 'admin':
            navigate('/admin/Dashboard')
            break
          case 'moderator':
            navigate('/moderator/Dashboard')
            break
          case 'student':
            navigate('/student/Dashboard')
            break
          default:
            navigate('/')
            break
        }
      }, 1500)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos. Por favor, verifica tus datos e intenta nuevamente.',
      })
    }
  }

  return (
    <div className="auth-background min-vh-100 d-flex flex-row align-items-center justify-content-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6} lg={5} xl={4} className="d-flex justify-content-center">
            <CCardGroup>
              <CCard className="p-4 bg-dark">
                <CCardBody>
                  <CForm onSubmit={handleSubmit} className="text-center">
                    <img src={logo} alt="Logo" className="logo" />
                    <p className="text-white mt-2">Ingresa tus datos para acceder a tu cuenta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Nombre de usuario"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>

                    <CRow className="justify-content-center">
                      <CCol xs="auto">
                        <Link to="/register">
                          <CButton color="link" className="text-white">
                            ¿No estás registrado? Regístrate
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>

                    <CRow className="justify-content-center mt-3">
                      <CCol xs="auto">
                        <CButton type="submit" color="primary" className="px-4">
                          Ingresar
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default Login
