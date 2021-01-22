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

const Platforms = props => {
  const { platforms, setTitle, role } = props

  useEffect(() => {
    const topbar = {
      title: 'Plataformas',
      menu: { Plataformas: '/platforms' },
    }
    setTitle(topbar)
    props.getAll('platforms', 'GET_PLATFORMS')
    // eslint-disable-next-line
  }, [])

  let tableHeader
  role === 'Administrador'
    ? (tableHeader = ['Nombre', 'Acciones'])
    : (tableHeader = ['Nombre'])

  const handleDeletePlatform = platformId => {
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
        props.deleted(`platforms/${platformId}`, 'DELETE_PLATFORM')
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  return (
    <>
      <Table head={tableHeader}>
        {platforms ? (
          platforms.map(platform => (
            <tr key={platform._id}>
              <td>{platform.name}</td>
              {role === 'Administrador' ? (
                <td>
                  <Link to={`platforms/${platform._id}`}>
                    <Button className="btn --warning">
                      <AiOutlineEdit />
                    </Button>
                  </Link>
                  <Button
                    className="btn --danger"
                    onClick={() => handleDeletePlatform(platform._id)}
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
      <Link to="/platforms/create">
        <AddButton>
          <BsPlus />
        </AddButton>
      </Link>
    </>
  )
}

const mapStateToProps = state => {
  return {
    platforms: state.platforms,
    role: state.role,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Platforms)
