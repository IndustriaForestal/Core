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

const SpecialProcesses = props => {
  const { specialProcesses, setTitle, role } = props

  useEffect(() => {
    const topbar = {
      title: 'Procesos Especiales',
      menu: { 'Procesos Especiales': '/specialProcesses' },
    }
    setTitle(topbar)
    props.getAll('specialProcesses', 'GET_SPECIAL_PROCESSES')
    // eslint-disable-next-line
  }, [])

  let tableHeader
  role === 'Administrador'
    ? (tableHeader = [
        'Nombre',
        'Capacidad',
        'Personal',
        'Duración',
        'Acciones',
      ])
    : (tableHeader = ['Nombre', 'Capacidad', 'Personal', 'Duración'])

  const handleDeleteSpecialProcess = specialProcessId => {
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
        props.deleted(
          `specialProcesses/${specialProcessId}`,
          'DELETE_SPECIAL_PROCESS'
        )
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  return (
    <>
      <Table head={tableHeader}>
        {specialProcesses ? (
          specialProcesses.map(specialProcess => (
            <tr key={specialProcess._id}>
              <td>{specialProcess.name}</td>
              <td>{specialProcess.capacity}</td>
              <td>{specialProcess.people}</td>
              <td>{specialProcess.duration}</td>
              {role === 'Administrador' ? (
                <td>
                  <Link to={`specialProcesses/${specialProcess._id}`}>
                    <Button className="btn --warning">
                      <AiOutlineEdit />
                    </Button>
                  </Link>
                  <Button
                    className="btn --danger"
                    onClick={() =>
                      handleDeleteSpecialProcess(specialProcess._id)
                    }
                  >
                    <AiOutlineDelete />
                  </Button>
                </td>
              ) : null}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No hay registros</td>
          </tr>
        )}
      </Table>
      <Link to="/specialProcesses/create">
        <AddButton>
          <BsPlus />
        </AddButton>
      </Link>
    </>
  )
}

const mapStateToProps = state => {
  return {
    specialProcesses: state.specialProcesses,
    role: state.role,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialProcesses)
