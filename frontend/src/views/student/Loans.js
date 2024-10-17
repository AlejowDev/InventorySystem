import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Flecha from '../../assets/images/flecha.png'
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

const StudentLoans = () => {
  const [loans, setLoans] = useState([])
  const userDocument = localStorage.getItem('document');

  useEffect(() => {
    refreshLoans()
  }, [])

  const refreshLoans = () => {
    axios
      .get('http://localhost:8081/api/loans')
      .then((response) => {
        const filteredLoans = response.data
          .filter((loan) => loan.receivingUser === userDocument)
          .sort((a, b) => new Date(b.loanDate) - new Date(a.loanDate)); // Ordenar de más reciente a más antiguo
  
        setLoans(filteredLoans);
      })
      .catch((error) => {
        console.error('Error fetching loans:', error);
      });
  };
  

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between">
              <span>Mis préstamos</span>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead className="text-nowrap text-center">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary"></CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">
                    Serial Dispositivos
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">
                    Nombres Dispositivos
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">
                    Fecha de Préstamo
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Fecha de Entrega</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Aprobación</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary">Estado</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody className="text-nowrap text-center">
                {loans.map((loan) => (
                  <CTableRow key={loan.id}>
                    <CTableDataCell style={{ borderColor: 'white' }}>
                      <img
                        src={Flecha}
                        alt="flecha"
                        style={{ width: '20px', height: '20px', filter: 'invert(100%)' }} // Invertir colores
                      />
                    </CTableDataCell>

                    <CTableDataCell style={{ borderColor: 'white' }}>
                      {Array.isArray(loan.devices) ? (
                        <ol className="text-start m-0 p-0">
                          {loan.devices.map((serial, index) => (
                            <li key={index} style={{ listStylePosition: 'inside' }}>
                              {serial}
                            </li>
                          ))}
                        </ol>
                      ) : (
                        'N/A'
                      )}
                    </CTableDataCell>
                    <CTableDataCell style={{ borderColor: 'white' }}>
                      {loan.deviceNames ? (
                        <ol className="text-start m-0 p-0">
                          {loan.deviceNames.split(',').map((nombre, index) => (
                            <li key={index} style={{ listStylePosition: 'inside' }}>
                              {nombre.trim()}
                            </li>
                          ))}
                        </ol>
                      ) : (
                        'N/A'
                      )}
                    </CTableDataCell>
                    <CTableDataCell style={{ borderColor: 'white' }}>
                      {new Date(loan.loanDate).toLocaleString('es-CO', {
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </CTableDataCell>
                    <CTableDataCell style={{ borderColor: 'white' }}>
                      {new Date(loan.deliveryDate).toLocaleString('es-CO', {
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </CTableDataCell>
                    <CTableDataCell
                      style={{
                        borderColor: 'white',
                        color:
                          loan.approval === 'Aprobado' || loan.approval === 'En uso'
                            ? '#0cff00'
                            : loan.approval === 'Pendiente' || loan.approval === 'Finalizado'
                              ? '#007cff'
                              : '#ff0000',
                      }}
                    >
                      {loan.approval}
                    </CTableDataCell>
                    <CTableDataCell
                      style={{
                        borderColor: 'white',
                        color: loan.state === 'Ocupado' ? 'gray' : '#0cff00',
                      }}
                    >
                      {loan.state}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default StudentLoans
