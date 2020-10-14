import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import { setTitle, getAll, deleted } from '../../actions/app'
import Swal from 'sweetalert2'
import Table from '../../components/Table/Table'
import Button from '../../components/Button/Button'
import AddButton from '../../components/AddButton/AddButton'
import './styles.scss'

const Nails = props => {
  const { material, setTitle } = props

  useEffect(() => {
    const topbar = {
      title: 'Materiales',
      menu: { Materiales: '/material' },
    }
    setTitle(topbar)
    props.getAll('material', 'GET_MATERIAL')
    // eslint-disable-next-line
  }, [])

  const tableHeader = ['Nombre', 'Proceso', 'Acciones']

  const handleDeleteMaterial = materialId => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
    }).then(result => {
      if (result.isConfirmed) {
        props.deleted(`material/${materialId}`, 'DELETE_MATERIAL')
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  console.log(material)

  return (
    <>
      <Table head={tableHeader}>
        {material ? (
          material.map(materialOne => (
            <tr key={materialOne._id}>
              <td>{materialOne.name}</td>
              <td>{materialOne.processes.map(process => process.name)}</td>
              <td>
                <Link to={`material/${materialOne._id}`}>
                  <Button className="btn --warning">
                    <AiOutlineEdit />
                  </Button>
                </Link>
                <Button
                  className="btn --danger"
                  onClick={() => handleDeleteMaterial(materialOne._id)}
                >
                  <AiOutlineDelete />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No hay registros</td>
          </tr>
        )}
      </Table>
      <Link to="/material/create">
        <AddButton>
          <BsPlus />
        </AddButton>
      </Link>
    </>
  )
}

const mapStateToProps = state => {
  return {
    material: state.material,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nails)
