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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilTrash } from '@coreui/icons'

const Loans = () => {
  const [loans, setLoans] = useState([])
  const [devices, setDevices] = useState([])
  const [users, setUsers] = useState([])
  const [moderators, setModerators] = useState([])
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [formData, setFormData] = useState({
    receivingUserId: '',
    deviceId: '',
    moderatorId: '',
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
      receivingUserId: '',
      deviceId: '',
      moderatorId: '',
      loanDate: '',
      deliveryDate: '',
      approval: '',
      state: '',
    })
    setCreateModalVisible(true)
  }

  const handleSave = () => {
    const { receivingUserId, deviceId, moderatorId, loanDate, deliveryDate, approval, state } =
      formData

    // Validar que los campos no estén vacíos
    if (
      !receivingUserId ||
      !deviceId ||
      !moderatorId ||
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
                <CButton color="primary" size="sm" onClick={handleCreate}>
                  <CIcon icon={cilPlus} /> Nuevo
                </CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Dispositivo</CTableHeaderCell>
                    <CTableHeaderCell>Usuario Receptor</CTableHeaderCell>
                    <CTableHeaderCell>Moderador</CTableHeaderCell>
                    <CTableHeaderCell>Fecha de Préstamo</CTableHeaderCell>
                    <CTableHeaderCell>Fecha de Entrega</CTableHeaderCell>
                    <CTableHeaderCell>Aprobación</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {loans.map((loan) => (
                    <CTableRow key={loan.id}>
                      <CTableDataCell>{loan.id}</CTableDataCell>
                      <CTableDataCell>{loan.device}</CTableDataCell>
                      <CTableDataCell>{loan.receivingUser}</CTableDataCell>
                      <CTableDataCell>{loan.moderator}</CTableDataCell>
                      <CTableDataCell>{loan.loanDate}</CTableDataCell>
                      <CTableDataCell>{loan.deliveryDate}</CTableDataCell>
                      <CTableDataCell>{loan.approval}</CTableDataCell>
                      <CTableDataCell>{loan.state}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="danger" size="sm" onClick={() => handleDelete(loan.id)}>
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
              name="receivingUserId"
              value={formData.receivingUserId}
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
              name="deviceId"
              value={formData.deviceId}
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
              name="moderatorId"
              value={formData.moderatorId}
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
                type="date"
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
                type="date"
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
              <option value="Prestado">Prestado</option>
              <option value="Disponible">Devuelto</option>
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setCreateModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            Guardar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Loans
