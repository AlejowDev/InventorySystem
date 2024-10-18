import React from 'react'
import { CButton, CCol, CContainer, CRow } from '@coreui/react'
import { useNavigate } from 'react-router-dom' // Importa useNavigate

const Page404 = () => {
  const navigate = useNavigate() // Inicializa el hook

  const handleGoBack = () => {
    navigate(-1) // Retrocede a la página anterior
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! No tienes permisos para acceder a esta página.</h4>
              <p className="text-body-secondary float-start">
                Por favor vuelve a la página anterior.
              </p>
            </div>
            <div className="text-center text-white">
              <CButton
                color="danger" // Cambia el color del botón a rojo
                onClick={handleGoBack} // Asocia la función al clic
                className="mt-3 text-white"
              >
                Volver
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
