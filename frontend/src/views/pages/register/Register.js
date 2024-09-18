import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2' // Importamos SweetAlert2
import './Register.css'
import {
  CButton,
  CCard,
  CCardBody,
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

const Register = () => {
  const [document, setDocument] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
      })
      return
    }

    try {
      const response = await axios.post('http://localhost:8081/api/auth/register', {
        document,
        name,
        username,
        password,
      })

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario registrado con éxito.',
        timer: 2000,
        timerProgressBar: true,
      })

      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Este documento ya tiene una cuenta.',
      })
    }
  }

  return (
    <div className="auth-background min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6} lg={4} xl={5}>
            <CCard className="bg-dark mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <img src={logo} alt="Logo" className="logo" />
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Documento"
                      value={document}
                      onChange={(e) => setDocument(e.target.value)}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Nombre completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Nombre de usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-2">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repite la contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>

                  <CRow className="justify-content-center mb-2">
                      <CCol xs="auto">
                        <Link to="/login">
                          <CButton color="link" className="text-white">
                            ¿Ya tienes cuenta? Ingresar
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>

                  
                  <div className="d-grid">
                    <CButton className='text-white' type="submit" color="primary">
                      Crear Cuenta
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default Register
