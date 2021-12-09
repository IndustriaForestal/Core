import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import MaterialTable from 'material-table'
import Select from 'react-select'
import moment from 'moment'
import { setTitle, getAll, deleted, get, create } from '../../actions/app'
import Loading from '../../components/Loading/Loading'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'

import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
// pick a date util library
import MomentUtils from '@date-io/moment'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import 'moment/locale/es'

const CreateOrder = props => {
  useEffect(() => {
    const topbar = {
      title: 'Crear Pedido',
      menu: {
        Pedidos: '/orders-customers',
        'Crear Pedido': '/orders-customers/create',
      },
    }
    props.setTitle(topbar)
    props
      .getAll('customers', 'GET_CUSTOMERS')
      .then(() => {
        props.getAll('pallets', 'GET_PALLETS')
      })
      .then(() => {
        props.getAll('zones/plants', 'GET_PLANTS')
      })
      .then(() => {
        props.getAll('customers/times', 'GET_CUSTOMERS_TIMES')
      })
    // eslint-disable-next-line
  }, [])

  const { customers, pallets, user, customersTimes } = props
  const [selectedDate, setDate] = useState(new Date())
  const [customerSelected, setCustomer] = useState(0)
  const [palletsOrder, setPalletsOrder] = useState([])

  const userId = user.id

  const theme = createMuiTheme({
    palette: {
      primary: { main: '#40b5ed' },
      secondary: { main: '#949494' },
    },
  })

  const handleCreate = () => {
    props
      .create('orders/customers', 'CREATE_ORDER_CUSTOMER', {
        customer_id: customerSelected,
        date: selectedDate,
        pallets: palletsOrder,
      })
      .then(() => props.history.goBack())
  }

  if (customers && pallets && customersTimes) {
    const lookupPallets = {}

    pallets.map(item => (lookupPallets[item.id] = item.model))

    const editable = {
      onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            newData.user_id = userId
            newData.date = moment(selectedDate).format('YYYY-MM-DD HH:mm:ss')
            setPalletsOrder([...palletsOrder, newData])
            resolve()
          }, 1000)
        }),

      onRowDelete: oldData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            setPalletsOrder(
              palletsOrder.filter(p => p.tableData.id !== oldData.tableData.id)
            )
            resolve()
          }, 1000)
        }),
    }

    return (
      <>
        <Card
          title="Nuevo Pedido"
          style={{ position: 'relative', zIndex: '99' }}
        >
          <h3>Cliente</h3>
          <Select
            onChange={e => setCustomer(e.value)}
            options={customers.map(customer => {
              return {
                value: customer.id,
                label: customer.name,
              }
            })}
          />
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils} locale={'es'}>
              <DateTimePicker
                okLabel="Guardar"
                clearLabel="Limpiar"
                cancelLabel="Cancelar"
                value={selectedDate}
                onChange={setDate}
              />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </Card>
        <MaterialTable
          title="Tarimas requeridas"
          columns={[
            { title: 'Modelo', field: 'pallet_id', lookup: lookupPallets },
            { title: 'Cantidad', field: 'amount' },
            { title: 'Entrega', field: 'date', editable: 'never' },
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
          data={palletsOrder}
          editable={editable}
        />
        <Button onClick={() => handleCreate()}>Crear</Button>
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    customers: state.reducerCustomers.customers,
    pallets: state.reducerPallets.pallets,
    user: state.reducerApp.user,
    customersTimes: state.reducerCustomers.customersTimes,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  get,
  deleted,
  create,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
