import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAll, create, update, setTitle, deleted } from '../../actions/app'
import Loading from '../../components/Loading/Loading'
import MaterialTable from 'material-table'

const Customers = props => {
  const { customers, user } = props
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Clientes',
      menu: {
        'Datos Fiscales': '/customers',
        'Datos de Entrega': '/customers-times',
      },
    }
    props.setTitle(topbar)
    props.getAll('customers', 'GET_CUSTOMERS')

    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`customers`, 'CREATE_CUSTOMER', newData)
            .then(() => props.getAll('customers', 'GET_CUSTOMERS'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          delete newData.id
          newData.user_id = userId
          props
            .update(`customers/${oldData.id}`, 'UPDATE_CUSTOMER', newData)
            .then(() => props.getAll('customers', 'GET_CUSTOMERS'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`customers/${oldData.id}`, 'DELETE_CUSTOMER')
            .then(() => props.getAll('customers', 'GET_CUSTOMERS'))
            .then(() => resolve())
        }, 1000)
      }),
  }

  if (customers) {
    return (
      <>
        <MaterialTable
          columns={[
            { title: 'Nombre', field: 'name' },
            { title: 'RFC', field: 'rfc' },
            { title: 'Dirección', field: 'address' },
            { title: 'email', field: 'email' },
            { title: 'Télefono', field: 'phone' },
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
            header: {
              actions: 'Acciones',
            },
            body: {
              editRow: {
                deleteText: '¿Eliminar?',
                saveTooltip: 'Ok',
                cancelTooltip: 'Cancelar',
              },
              editTooltip: 'Editar',
              deleteTooltip: 'Eliminar',
              addTooltip: 'Agregar',
            },
          }}
          data={customers}
          editable={editable}
          title="Clientes"
        />
      </>
    )
  } else {
    return <Loading />
  }
}

const mapDispatchToProps = {
  create,
  getAll,
  update,
  setTitle,
  deleted,
}

const mapStateToProps = state => {
  return {
    customers: state.reducerCustomers.customers,
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers)
