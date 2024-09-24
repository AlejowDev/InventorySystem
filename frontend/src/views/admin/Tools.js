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
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilTrash } from '@coreui/icons'

const ToolsTable = () => {
  const [tools, setTools] = useState([])
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [formData, setFormData] = useState({
    serial: '',
    nombre: '',
    descripcion: '',
    imagen: null, // Inicializar como null
  })

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/tools')
      .then((response) => {
        setTools(response.data)
      })
      .catch((error) => {
        console.error('Error fetching tools:', error)
      })
  }, [])

  const handleDelete = (toolSerial) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar esta herramienta!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8081/api/tools/${toolSerial}`)
          .then(() => {
            setTools(tools.filter((tool) => tool.serial !== toolSerial))
            Swal.fire('Eliminado', 'La herramienta ha sido eliminada.', 'success')
          })
          .catch((error) => {
            console.error('Error deleting tool:', error)
            Swal.fire('Error', 'No se pudo eliminar la herramienta.', 'error')
          })
      }
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData({ ...formData, imagen: file })
  }

  const handleCreate = () => {
    setFormData({
      serial: '',
      nombre: '',
      descripcion: '',
      imagen: null,
    })
    setCreateModalVisible(true)
  }

  const handleSave = async () => {
    const { serial, nombre, descripcion, imagen } = formData // Extraer valores de formData
    const formDataToSend = new FormData()
    formDataToSend.append('nombre', nombre)
    formDataToSend.append('descripcion', descripcion)
    formDataToSend.append('serial', serial)
    formDataToSend.append('imagen', imagen)

    try {
      const response = await axios.post('http://localhost:8081/api/tools', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('Tool created:', response.data)

      // Actualizar el estado con la nueva herramienta
      setTools([...tools, response.data.tool])
      setCreateModalVisible(false) // Cerrar modal después de crear
      Swal.fire('Éxito', 'Herramienta creada exitosamente.', 'success')

      // Refrescar la lista de herramientas
      refreshTools()
    } catch (error) {
      console.error('Error creating tool:', error)
      Swal.fire('Error', 'No se pudo crear la herramienta.', 'error')
    }
  }

  const refreshTools = () => {
    axios
      .get('http://localhost:8081/api/tools')
      .then((response) => {
        setTools(response.data)
      })
      .catch((error) => {
        console.error('Error fetching tools:', error)
      })
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <span>Herramientas</span>
                <CButton color="primary" onClick={handleCreate}>
                  <CIcon icon={cilPlus} /> Crear
                </CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">Serial</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Nombre</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Descripción</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Imagen</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tools.map((tool, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{tool.serial}</CTableDataCell>
                      <CTableDataCell>{tool.nombre}</CTableDataCell>
                      <CTableDataCell>{tool.descripcion}</CTableDataCell>
                      <CTableDataCell>{tool.imagen}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="danger" size="sm" onClick={() => handleDelete(tool.serial)}>
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

      {/* Modal para crear herramienta */}
      <CModal visible={createModalVisible} onClose={() => setCreateModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Crear Herramienta</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              label="Serial"
              name="serial"
              value={formData.serial}
              onChange={handleInputChange}
            />
            <CFormInput
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            <CFormInput
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
            />
            <CFormInput label="Imagen" name="imagen" type="file" onChange={handleFileChange} />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setCreateModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            Crear herramienta
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ToolsTable
