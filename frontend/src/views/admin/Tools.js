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
import { cilPlus, cilTrash, cilPencil } from '@coreui/icons'

const ToolsTable = () => {
  const [tools, setTools] = useState([])
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [formData, setFormData] = useState({
    serial: '',
    nombre: '',
    descripcion: '',
    imagen: null,
  })
  const [currentTool, setCurrentTool] = useState(null)

  useEffect(() => {
    refreshTools()
  }, [])

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

  const handleEdit = (tool) => {
    setFormData({
      serial: tool.serial,
      nombre: tool.nombre,
      descripcion: tool.descripcion,
      // No establecemos imagen aquí, ya que no queremos editarla
    });
    setCurrentTool(tool);
    setEditModalVisible(true);
  };

  const handleSave = async () => {
    const { serial, nombre, descripcion, imagen } = formData

    // Validar que los campos no estén vacíos
    if (!serial || !nombre || !descripcion || !imagen) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error')
      return
    }

    const formDataToSend = new FormData()
    formDataToSend.append('serial', serial)
    formDataToSend.append('nombre', nombre)
    formDataToSend.append('descripcion', descripcion)
    formDataToSend.append('imagen', imagen)

    try {
      const response = await axios.post('http://localhost:8081/api/tools', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setTools([...tools, response.data.tool])
      setCreateModalVisible(false)
      Swal.fire('Éxito', 'Herramienta creada exitosamente.', 'success')
      refreshTools()
    } catch (error) {
      console.error('Error creating tool:', error)
      Swal.fire('Error', 'No se pudo crear la herramienta.', 'error')
    }
  }

  const handleUpdate = async () => {
    const { serial, nombre, descripcion } = formData; // No necesitamos la imagen aquí
    const formDataToSend = new FormData();
  
    formDataToSend.append('serial', serial);
    formDataToSend.append('nombre', nombre);
    formDataToSend.append('descripcion', descripcion);
  
    // Solo agrega la imagen si hay un archivo nuevo
    if (formData.imagen) {
      formDataToSend.append('imagen', formData.imagen);
    }
  
    try {
      const response = await axios.put(
        `http://localhost:8081/api/tools/${serial}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setEditModalVisible(false);
      Swal.fire('Éxito', 'Herramienta actualizada exitosamente.', 'success');
      refreshTools();
    } catch (error) {
      console.error('Error updating tool:', error);
      Swal.fire('Error', 'No se pudo actualizar la herramienta.', 'error');
    }
  };

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <span>Dispositivos y Herramientas para Préstamo.</span>
                <CButton color="primary" size="sm" onClick={handleCreate}>
                  <CIcon icon={cilPlus} /> Nuevo
                </CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap text-center">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">Serial</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Nombre</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Descripción</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Imagen</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody className="text-nowrap text-center">
                  {tools.map((tool, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{tool.serial}</CTableDataCell>
                      <CTableDataCell>{tool.nombre}</CTableDataCell>
                      <CTableDataCell>{tool.descripcion}</CTableDataCell>
                      <CTableDataCell>
                        {tool.imagen && (
                          <img
                            src={`http://localhost:8081/${tool.imagen}`}
                            alt={tool.nombre}
                            style={{ width: '40px', height: '40px' }}
                          />
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton className="custom-btn-edit me-2" size="sm" onClick={() => handleEdit(tool)}>
                          <CIcon icon={cilPencil} />
                        </CButton>{' '}
                        <CButton className="custom-btn-delete me-2" size="sm" onClick={() => handleDelete(tool.serial)}>
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
            Guardar
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal para editar herramienta */}
      <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Editar Herramienta</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
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
          <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleUpdate}>
            Guardar Cambios
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ToolsTable
