import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'

const NewLoan = () => {
  const [devices, setDevices] = useState([])
  const [cart, setCart] = useState([])
  const [error, setError] = useState(null) // Agregar un estado para el error

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
        setError('Error al cargar los dispositivos.') // Manejo de error
      })
  }

  const handleAddToCart = (device) => {
    setCart((prevCart) => [...prevCart, device])
    Swal.fire('Éxito', `${device.nombre} ha sido añadido al carrito.`, 'success')
  }

  const handleRequestLoan = () => {
    // Aquí puedes definir los datos que necesitas enviar para el préstamo
    const loanData = {
      receivingUser: 'usuario_documento', // Reemplaza con el documento del usuario que recibe el préstamo
      moderator: 'moderador_documento', // Reemplaza con el documento del moderador
      loanDate: new Date().toISOString().split('T')[0], // Fecha actual
      deliveryDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0], // Fecha de entrega (por ejemplo, en 7 días)
      approval: false, // Estado inicial del préstamo
      state: 'Pendiente', // Estado del préstamo
      devices: cart.map((device) => device.serial), // Array de seriales de los dispositivos en el carrito
    }

    // Realiza la petición POST a la API
    axios
      .post('http://localhost:8081/api/loans', loanData)
      .then((response) => {
        Swal.fire('Éxito', 'Préstamo solicitado con éxito.', 'success')
        setCart([]) // Limpiar el carrito después de solicitar el préstamo
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
            {/* Mostrar carrito */}
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
                        <CRow className="mt-4">
                          <CCol xs="auto">
                            <CButton
                              color="primary"
                              onClick={handleRequestLoan}
                              disabled={cart.length === 0} // Deshabilitar si el carrito está vacío
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

            {/* Mostrar mensaje de error si hay un problema */}
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
                      {device.imagen ? ( // Comprobar si la imagen existe
                        <img
                          src={`http://localhost:8081/${device.imagen}`} // Ajusta la URL de la imagen aquí
                          alt={device.nombre}
                          style={{ width: '140px', height: '130px' }}
                        />
                      ) : (
                        <div>No hay imagen disponible</div> // Mensaje alternativo si no hay imagen
                      )}
                      <p className="mt-2">{device.descripcion || 'Descripción no disponible'}</p>

                      {/* Comprobar el estado del dispositivo y condicionar el botón */}
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
