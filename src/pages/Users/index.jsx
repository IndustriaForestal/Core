import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsPlus } from 'react-icons/bs'
import Swal from 'sweetalert2'
import MaterialTable from 'material-table'
import { setTitle, getAll, deleted } from '../../actions/app'
import Button from '../../components/Button/Button'
import AddButton from '../../components/AddButton/AddButton'
import './styles.scss'

const Users = props => {
  const { users, setTitle, workstations, zones, plants } = props

  useEffect(() => {
    const topbar = {
      title: 'Usuarios',
      menu: {
        Usuarios: '/users',
        Roles: '/users/roles',
        'Pantallas Roles': '/users/screens',
        'Notificaciones por Roles': '/users/notifications',
      },
    }
    setTitle(topbar)
    props
      .getAll('users', 'GET_USERS')
      .then(() => {
        props.getAll('zones/workstations', 'GET_WORKSTATIONS')
      })
      .then(() => {
        props.getAll('zones/plants', 'GET_PLANTS')
      })
      .then(() => {
        props.getAll('zones/zones', 'GET_ZONES')
      })
    // eslint-disable-next-line
  }, [])

  const lookupWorkstations = {}
  workstations &&
    workstations.map(item => (lookupWorkstations[item.id] = item.workstation))

  const lookupPlants = {}
  plants && plants.map(item => (lookupPlants[item.id] = item.name))

  const lookupZones = {}
  zones && zones.map(item => (lookupZones[item.id] = item.name))

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
        props.deleted(`users/${userId}`, 'DELETE_USER').then(() => {
          props.getAll('users', 'GET_USERS')
        })
        Swal.fire('Borrado!', 'Borrado con exito.', 'success')
      }
    })
  }

  return (
    <>
      <MaterialTable
        columns={[
          {
            title: 'Nombre',
            field: 'name',
          },
          {
            title: 'Usuario',
            field: 'user',
          },
          {
            title: 'Rol',
            field: 'role',
          },
          {
            title: 'Planta',
            field: 'plant_id',
            lookup: lookupPlants,
          },
          {
            title: 'Zona',
            field: 'zone_id',
            lookup: lookupZones,
          },
          {
            title: 'Estación de trabajo',
            field: 'workstation_id',
            lookup: lookupWorkstations,
          },
          {
            title: 'Acciones',
            field: 'id',
            render: rowData => (
              <>
                <Link to={`users/${rowData.id}`}>
                  <Button className="btn --warning">
                    <AiOutlineEdit />
                  </Button>
                </Link>
                <Button
                  className="btn --danger"
                  onClick={() => handleDeleteUser(rowData.id)}
                >
                  <AiOutlineDelete />
                </Button>{' '}
              </>
            ),
          },
        ]}
        localization={{
          pagination: {
            labelDisplayedRows: '{from}-{to} de {count}',
            labelRowsSelect: 'Filas',
            firstAriaLabel: 'Primera',
            firstTooltip: 'Primera',
            previousAriaLabel: 'Anterior',
            previousTooltip: 'Anterior',
            nextAriaLabel: 'Siguiente',
            nextTooltip: 'Siguiente',
            lastAriaLabel: 'Ultimo',
            lastTooltip: 'Ultimo',
          },
          toolbar: {
            searchTooltip: 'Buscar',
            searchPlaceholder: 'Buscar',
          },
        }}
        data={users}
        title="Usuarios"
      />
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
    users: state.reducerUsers.users,
    workstations: state.reducerZones.workstations,
    zones: state.reducerZones.zones,
    plants: state.reducerZones.plants,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  deleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
