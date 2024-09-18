import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import './ChangePassword.css'
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
import { cilLockLocked } from '@coreui/icons'
import logo from '../../../assets/images/logo.png'

const ChangePassword = () => {
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
      const response = await axios.post('http://localhost:8081/api/auth/change-password', {
        newPassword: password,
      })

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Contraseña actualizada con éxito.',
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
        text: 'Hubo un problema actualizando la contraseña.',
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
                  
                  <h3 className="text-white mb-4">Cambia tu Contraseña</h3>
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Nueva Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirma la Nueva Contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton className="text-white" type="submit" color="primary">
                      Cambiar Contraseña
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

export default ChangePassword
