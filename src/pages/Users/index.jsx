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

const Users = props => {
  const { users, setTitle, role } = props

  useEffect(() => {
    const topbar = {
      title: 'Usuarios',
      menu: { Usuarios: '/users' },
    }
    setTitle(topbar)
    props.getAll('users', 'GET_USERS')
    // eslint-disable-next-line
  }, [])
  let tableHeader
  if (role === 'Administrador') {
    tableHeader = ['Nombre', 'Usuario', 'Roll', 'Acciones']
  } else {
    tableHeader = ['Nombre', 'Usuario', 'Roll']
  }

  const handleDeleteUser = userId => {
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
        props.deleted(`users/${userId}`, 'DELETE_USER')
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  return (
    <>
      <Table head={tableHeader}>
        {users ? (
          users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.user}</td>
              <td>{user.role}</td>
              {role === 'Administrador' ? (
                <td>
                  <Link to={`users/${user._id}`}>
                    <Button className="btn --warning">
                      <AiOutlineEdit />
                    </Button>
                  </Link>
                  <Button
                    className="btn --danger"
                    onClick={() => handleDeleteUser(user._id)}
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
      <Link to="/users/create">
        <AddButton>
          <BsPlus />
        </AddButton>
      </Link>
    </>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users,
    role: state.role,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
