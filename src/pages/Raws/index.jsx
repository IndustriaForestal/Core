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

const Raws = props => {
  const { raws, setTitle, role } = props

  useEffect(() => {
    const topbar = {
      title: 'Materia Prima',
      menu: { 'Materia Prima': '/raws' },
    }
    setTitle(topbar)
    props.getAll('raws', 'GET_RAWS')
    // eslint-disable-next-line
  }, [])

  let tableHeader
  role === 'Administrador'
    ? (tableHeader = ['Nombre', 'Acciones'])
    : (tableHeader = ['Nombre'])

  const handleDeleteRaw = rawId => {
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
        props.deleted(`raws/${rawId}`, 'DELETE_RAW')
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  return (
    <>
      <Table head={tableHeader}>
        {raws ? (
          raws.map(raw => (
            <tr key={raw._id}>
              <td>{raw.name}</td>
              {role === 'Administrador' ? (
                <td>
                  <Link to={`raws/${raw._id}`}>
                    <Button className="btn --warning">
                      <AiOutlineEdit />
                    </Button>
                  </Link>
                  <Button
                    className="btn --danger"
                    onClick={() => handleDeleteRaw(raw._id)}
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
      <Link to="/raws/create">
        <AddButton>
          <BsPlus />
        </AddButton>
      </Link>
    </>
  )
}

const mapStateToProps = state => {
  return {
    raws: state.raws,
    role: state.role,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Raws)
