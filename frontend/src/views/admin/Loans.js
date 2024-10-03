import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
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
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormSelect,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilTrash, cilPen } from '@coreui/icons'

const Loans = () => {
  const [loans, setLoans] = useState([])
  const [devices, setDevices] = useState([])
  const [users, setUsers] = useState([])
  const [moderators, setModerators] = useState([])
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    receivingUser: '',
    device: '',
    moderator: '',
    loanDate: '',
    deliveryDate: '',
    approval: '',
    state: '',
  })

  useEffect(() => {
    refreshLoans()
    fetchDevices()
    fetchUsers()
    fetchModerators()
  }, [])

  const refreshLoans = () => {
    axios
      .get('http://localhost:8081/api/loans')
      .then((response) => {
        setLoans(response.data)
      })
      .catch((error) => {
        console.error('Error fetching loans:', error)
      })
  }

  const fetchDevices = () => {
    axios
      .get('http://localhost:8081/api/tools')
      .then((response) => {
        setDevices(response.data)
      })
      .catch((error) => {
        console.error('Error fetching devices:', error)
      })
  }

  const fetchUsers = () => {
    axios
      .get('http://localhost:8081/api/users')
      .then((response) => {
        const nonAdminUsers = response.data.filter((user) => user.role !== 'admin')
        setUsers(nonAdminUsers)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }

  const fetchModerators = () => {
    axios
      .get('http://localhost:8081/api/users')
      .then((response) => {
        const moderators = response.data.filter((user) => user.role === 'moderator')
        setModerators(moderators)
      })
      .catch((error) => {
        console.error('Error fetching moderators:', error)
      })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCreate = () => {
    setFormData({
      id: '',
      receivingUser: '',
      device: '',
      moderator: '',
      loanDate: '',
      deliveryDate: '',
      approval: '',
      state: '',
    })
    setCreateModalVisible(true)
  }

  const handleEdit = (loan) => {
    setFormData({
      id: loan.id,
      receivingUser: loan.receivingUser,
      device: loan.device,
      moderator: loan.moderator,
      loanDate: loan.loanDate,
      deliveryDate: loan.deliveryDate,
      approval: loan.approval,
      state: loan.state,
    })
    setEditModalVisible(true)
  }

  const handleUpdate = () => {
    const { id, approval, state } = formData

    if (!approval || !state) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error')
      return
    }

    axios
      .put(`http://localhost:8081/api/loans/${id}`, formData)
      .then((response) => {
        const updatedLoans = loans.map((loan) => (loan.id === id ? response.data : loan))
        setLoans(updatedLoans)
        setEditModalVisible(false)
        Swal.fire('Éxito', 'Préstamo actualizado exitosamente.', 'success')
        refreshLoans()
      })
      .catch((error) => {
        console.error('Error updating loan:', error)
        Swal.fire('Error', 'No se pudo actualizar el préstamo.', 'error')
      })
  }

  const handleSave = () => {
    const { receivingUser, device, moderator, loanDate, deliveryDate, approval, state } = formData

    // Validar que los campos no estén vacíos
    if (
      !receivingUser ||
      !device ||
      !moderator ||
      !loanDate ||
      !deliveryDate ||
      !approval ||
      !state
    ) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error')
      return
    }

    axios
      .post('http://localhost:8081/api/loans', formData)
      .then((response) => {
        setLoans([...loans, response.data])
        setCreateModalVisible(false)
        Swal.fire('Éxito', 'Préstamo creado exitosamente.', 'success')
        refreshLoans()
      })
      .catch((error) => {
        console.error('Error creating loan:', error)
        Swal.fire('Error', 'No se pudo crear el préstamo.', 'error')
      })
  }

  const handleDelete = (loanId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este préstamo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8081/api/loans/${loanId}`)
          .then(() => {
            setLoans(loans.filter((loan) => loan.id !== loanId))
            Swal.fire('Eliminado', 'El préstamo ha sido eliminado.', 'success')
          })
          .catch((error) => {
            console.error('Error deleting loan:', error)
            Swal.fire('Error', 'No se pudo eliminar el préstamo.', 'error')
          })
      }
    })
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <span>Préstamos</span>
                <CButton className='custom-btn' size="sm" onClick={handleCreate}>
                  Nuevo
                </CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap text-center">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">#</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Serial Dispositivo
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Nombre Dispositivo
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Documento Receptor
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Nombre Receptor
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Documento Moderador
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Nombre Moderador
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Fecha de Préstamo
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Fecha de Entrega
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Aprobación</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Estado</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody className="text-nowrap text-center">
                  {loans.map((loan) => (
                    <CTableRow key={loan.id}>
                      <CTableDataCell>{loan.id}</CTableDataCell>
                      <CTableDataCell>{loan.device}</CTableDataCell>
                      <CTableDataCell>{loan.deviceName}</CTableDataCell>
                      <CTableDataCell>{loan.receivingUser}</CTableDataCell>
                      <CTableDataCell>{loan.receivingUserName}</CTableDataCell>
                      <CTableDataCell>{loan.moderator}</CTableDataCell>
                      <CTableDataCell>{loan.moderatorName}</CTableDataCell>
                      <CTableDataCell>
                        {new Date(loan.loanDate).toLocaleString('es-CO', {
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                          hour12: true, // Para formato de 12 horas
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </CTableDataCell>
                      <CTableDataCell>
                        {new Date(loan.deliveryDate).toLocaleString('es-CO', {
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                          hour12: true, // Para formato de 12 horas
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </CTableDataCell>
                      <CTableDataCell
                        style={{
                          color:
                            loan.approval === 'Aprobado'
                              ? '#0cff00'
                              : loan.approval === 'Pendiente'
                                ? '#007cff'
                                : '#ff0000',
                        }}
                      >
                        {loan.approval}
                      </CTableDataCell>
                      <CTableDataCell
                        style={{
                          color:
                            loan.state === 'Prestado'
                              ? 'gray'
                              : loan.state === 'Disponible'
                                ? '#0cff00'
                                : '#0cff00',
                        }}
                      >
                        {loan.state}
                      </CTableDataCell>

                      <CTableDataCell>
                        <CButton
                          className="custom-btn-edit me-2"
                          size="sm"
                          onClick={() => handleEdit(loan)}
                        >
                          <CIcon icon={cilPen} />
                        </CButton>
                        <CButton
                          className="custom-btn-delete"
                          size="sm"
                          onClick={() => handleDelete(loan.id)}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal para crear préstamo */}
      <CModal visible={createModalVisible} onClose={() => setCreateModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Crear Préstamo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormSelect
              label="Usuario Receptor"
              name="receivingUser"
              value={formData.receivingUser}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar usuario</option>
              {users.length > 0 ? (
                users.map((user) => (
                  <option key={user.document} value={user.document}>
                    {user.name}
                  </option>
                ))
              ) : (
                <option disabled>Cargando usuarios...</option>
              )}
            </CFormSelect>
            <CFormSelect
              label="Dispositivo"
              name="device"
              value={formData.device}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar dispositivo</option>
              {devices.length > 0 ? (
                devices.map((device) => (
                  <option key={device.serial} value={device.serial}>
                    {device.nombre}
                  </option>
                ))
              ) : (
                <option disabled>Cargando dispositivos...</option>
              )}
            </CFormSelect>

            <CFormSelect
              label="Moderador"
              name="moderator"
              value={formData.moderator}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar moderador</option>
              {moderators.length > 0 ? (
                moderators.map((moderator) => (
                  <option key={moderator.document} value={moderator.document}>
                    {moderator.name}
                  </option>
                ))
              ) : (
                <option disabled>Cargando moderadores...</option>
              )}
            </CFormSelect>
            <div className="mb-3">
              <label htmlFor="loanDate" className="form-label">
                Fecha de Préstamo
              </label>
              <input
                type="datetime-local"
                id="loanDate"
                name="loanDate"
                value={formData.loanDate}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Fecha de préstamo"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="deliveryDate" className="form-label">
                Fecha de Entrega
              </label>
              <input
                type="datetime-local"
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Fecha de entrega"
              />
            </div>

            <CFormSelect
              label="Aprobación"
              name="approval"
              value={formData.approval}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar aprobación</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </CFormSelect>
            <CFormSelect
              label="Estado"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar estado</option>
              <option value="En inventario">En inventario</option>
              <option value="Prestado">Prestado</option>
              <option value="Disponible">Devuelto</option>
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setCreateModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton className='custom-btn' onClick={handleSave}>
            Guardar
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Modal para editar préstamos */}
      <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Editar Préstamo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormSelect
              label="Aprobación"
              name="approval"
              value={formData.approval}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar aprobación</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </CFormSelect>
            <CFormSelect
              label="Estado"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar estado</option>
              <option value="En inventario">En inventario</option>
              <option value="Prestado">Prestado</option>
              <option value="Disponible">Disponible</option>
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
            Cerrar
          </CButton>
          <CButton color="primary" onClick={handleUpdate}>
            Actualizar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Loans
