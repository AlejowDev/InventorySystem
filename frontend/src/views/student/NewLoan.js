import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'

const NewLoan = () => {
  const [devices, setDevices] = useState([])
  const [cart, setCart] = useState([])
  const [error, setError] = useState(null)
  const [deliveryDate, setDeliveryDate] = useState('')

  useEffect(() => {
    fetchDevices()
  }, [])

  const fetchDevices = () => {
    axios
      .get('http://localhost:8081/api/tools')
      .then((response) => {
        setDevices(response.data)
      })
      .catch((error) => {
        console.error('Error fetching devices:', error)
        setError('Error al cargar los dispositivos.')
      })
  }

  const handleAddToCart = (device) => {
    setCart((prevCart) => [...prevCart, device])
    Swal.fire('Éxito', `${device.nombre} ha sido añadido al carrito.`, 'success')
  }

  const handleRequestLoan = () => {
    if (!deliveryDate) {
      Swal.fire(
        'Advertencia',
        'Por favor, completa la fecha de entrega antes de solicitar el préstamo.',
        'warning',
      )
      return
    }

    const formatDateToDatabase = (date) => {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      return new Date(date).toLocaleString('sv-SE', options).replace(' ', 'T')
    }

    // Obtener el documento desde localStorage
    const receivingUser = localStorage.getItem('document') // Cambia esto si usas un formato diferente

    const loanData = {
      receivingUser: receivingUser,
      moderator: '0100101001',
      loanDate: formatDateToDatabase(new Date()),
      deliveryDate: deliveryDate,
      approval: 'Pendiente',
      state: 'Disponible',
      devices: cart.map((device) => device.serial),
    }

    console.log('Loan data before request:', loanData)

    axios
      .post('http://localhost:8081/api/loans', loanData)
      .then((response) => {
        console.log('Response from server:', response)
        Swal.fire('Éxito', 'Préstamo solicitado con éxito.', 'success')
        setCart([])
        setDeliveryDate('')
      })
      .catch((error) => {
        console.error('Error requesting loan:', error)
        Swal.fire('Error', 'Hubo un problema al solicitar el préstamo.', 'error')
      })
  }

  return (
    <>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between">
              <span>Nuevo préstamo</span>
            </div>
          </CCardHeader>
          <CCardBody>
            <CRow className="mt-4 mb-4">
              <CCol xs>
                <CCard>
                  <CCardHeader className="text-center">
                    <h5>Mi Carrito</h5>
                  </CCardHeader>
                  <CCardBody>
                    {cart.length === 0 ? (
                      <div className="text-center">
                        <p>No hay productos en el carrito.</p>
                      </div>
                    ) : (
                      <div>
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Dispositivo</th>
                              <th>Descripción</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cart.map((item, index) => (
                              <tr key={index}>
                                <td>{item.nombre}</td>
                                <td>{item.descripcion || 'Descripción no disponible'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <CRow className="mb-4">
                          <CCol xs>
                            <label htmlFor="deliveryDate">Fecha de Entrega:</label>
                            <input
                              required
                              type="datetime-local"
                              id="deliveryDate"
                              className="form-control"
                              value={deliveryDate}
                              onChange={(e) => setDeliveryDate(e.target.value)}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mt-4">
                          <CCol xs="auto">
                            <CButton
                              color="primary"
                              onClick={handleRequestLoan}
                              disabled={cart.length === 0}
                            >
                              Pedir Préstamo
                            </CButton>
                          </CCol>
                        </CRow>
                      </div>
                    )}
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>

            {error && (
              <CRow className="mb-4">
                <CCol xs>
                  <div className="alert alert-danger">{error}</div>
                </CCol>
              </CRow>
            )}

            <CRow>
              {devices.map((device) => (
                <CCol xs={12} sm={6} md={4} lg={3} key={device.serial} className="mb-4">
                  <CCard>
                    <CCardHeader className="text-center">{device.nombre}</CCardHeader>
                    <CCardBody className="text-center">
                      {device.imagen ? (
                        <img
                          src={`http://localhost:8081/${device.imagen}`}
                          alt={device.nombre}
                          style={{ width: '140px', height: '130px' }}
                        />
                      ) : (
                        <div>No hay imagen disponible</div>
                      )}
                      <p className="mt-2">{device.descripcion || 'Descripción no disponible'}</p>

                      {device.estado === 'Ocupado' ? (
                        <CButton color="secondary" disabled>
                          Ocupado
                        </CButton>
                      ) : (
                        <CButton color="primary" onClick={() => handleAddToCart(device)}>
                          Añadir al Carrito
                        </CButton>
                      )}
                    </CCardBody>
                  </CCard>
                </CCol>
              ))}
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default NewLoan
