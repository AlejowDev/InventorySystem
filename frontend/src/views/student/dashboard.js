import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilBolt, cilGlobeAlt } from '@coreui/icons'
import backgroundImage from '../../assets/images/background-student.jpg'

const StudentDashboard = () => {
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="text-center">¡Hola universitario, bienvenido a Inventory!</CCardHeader>
            <CCardBody className="text-center">
              <img src={backgroundImage} alt="Imagen de bienvenida" className="img-fluid" />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default StudentDashboard
