import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getAll, create, update, setTitle, deleted } from '../../../actions/app'
import Loading from '../../../components/Loading/Loading'
import MaterialTable from 'material-table'

const Customers = props => {
  const { customers, user, plants, customersTimes } = props

  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Clientes',
      menu: {
        Clientes: '/customers',
        'Tiempo de entrega': '/cusomters-time',
      },
    }
    props.setTitle(topbar)
    props
      .getAll('customers', 'GET_CUSTOMERS')
      .then(() => {
        props.getAll('zones/plants', 'GET_PLANTS')
      })
      .then(() => {
        props.getAll('customers/times', 'GET_CUSTOMERS_TIMES')
      })

    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`customers/times`, 'CREATE_CUSTOMER_TIME', newData)
            .then(() => props.getAll('customers/times', 'GET_CUSTOMERS_TIMES'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          delete newData.id
          newData.user_id = userId
          props
            .update(
              `customers/times/${oldData.id}`,
              'UPDATE_CUSTOMER_TIME',
              newData
            )
            .then(() => props.getAll('customers/times', 'GET_CUSTOMERS_TIMES'))
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`customers/times/${oldData.id}`, 'DELETE_CUSTOMER_TIME')
            .then(() => props.getAll('customers/times', 'GET_CUSTOMERS_TIMES'))
            .then(() => resolve())
        }, 1000)
      }),
  }

  if (customers && plants && customersTimes) {
    const lookupItemsType = {}
    const lookupCustomers = {}
    plants.map(item => (lookupItemsType[item.id] = item.name))
    customers.map(item => (lookupCustomers[item.id] = item.name))
    return (
      <>
        <MaterialTable
          columns={[
            { title: 'Cliente', field: 'customer_id', lookup: lookupCustomers },
            { title: 'Planta', field: 'plant_id', lookup: lookupItemsType },
            { title: 'Horas del viaje', field: 'hours' },
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
          data={customersTimes}
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
    customersTimes: state.reducerCustomers.customersTimes,
    plants: state.reducerZones.plants,
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers)
