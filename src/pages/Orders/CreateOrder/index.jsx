import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import MaterialTable from 'material-table'
import Select from 'react-select'
import moment from 'moment'
import { setTitle, getAll, deleted, get, create } from '../../../actions/app'
import { orderSavePallets } from '../actions'
import Loading from '../../../components/Loading/Loading'
import Card from '../../../components/Card/Card'
import Button from '../../../components/Button/Button'
import './styles.scss'

import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
// pick a date util library
import MomentUtils from '@date-io/moment'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import 'moment/locale/es'

const CreateOrder = props => {
  useEffect(() => {
    const topbar = {
      title: 'Crear Orden',
      menu: { Pedidos: '/orders', 'Crear Orden': '/orders/create' },
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

  const { customers, pallets, user, customersTimes, plants } = props
  const [selectedDate, setDate] = useState(new Date())
  const [customerSelected, setCustomer] = useState(0)
  const [palletsOrder, setPalletsOrder] = useState([])
  const [timeTravel, setTimeTravel] = useState(0)

  const userId = user.id

  const theme = createMuiTheme({
    palette: {
      primary: { main: '#40b5ed' },
      secondary: { main: '#949494' },
    },
  })

  const handleNext = () => {
    props.orderSavePallets({
      customer_id: customerSelected,
      date: selectedDate,
      pallets: palletsOrder,
    })
    props.history.push('/orders/preview')
  }

  if (customers && pallets && customersTimes && plants) {
    const lookupPallets = {}

    pallets.map(item => (lookupPallets[item.id] = item.model))

    const editable = {
      onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            newData.user_id = userId
            newData.check = 0
            newData.check_type = null
            newData.check_stage = 0
            newData.none_stage = 0
            newData.amount_stock = 0
            newData.amount_items = []
            newData.amount_sawn = []
            newData.amount_stock_supplier = 0
            newData.amount_items_supplier = []
            newData.amount_sawn_supplier = []
            newData.stage1 = 0
            newData.stage1_supplier = 0
            newData.stage2 = 0
            newData.stage2_supplier = 0
            newData.stage3 = 0
            newData.stage3_supplier = 0
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

    const handleCustomerTime = id => {
      console.log(customersTimes, plants, id, customerSelected)

      const time = customersTimes.find(
        time =>
          parseInt(time.customer_id) === parseInt(customerSelected) &&
          parseInt(time.plant_id) === parseInt(id)
      )

      if (time !== undefined) {
        return setTimeTravel(time.hours)
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
        })

        return Toast.fire({
          icon: 'info',
          title: 'No existe tiempo de viaje',
        })
      }
    }

    return (
      <>
        <Card title="Nueva Orden" style={{position: 'relative', zIndex: '99'}}>
          <h1>Datos</h1>
          <Select
            onChange={e => setCustomer(e.value)}
            options={customers.map(customer => {
              return {
                value: customer.id,
                label: customer.name,
              }
            })}
          />
          <Select
            onChange={e => handleCustomerTime(e.value)}
            options={plants.map(plant => {
              return {
                value: plant.id,
                label: plant.name,
              }
            })}
          />
          {timeTravel > 0 ? <h3>Tiempo de viaje: {timeTravel} hrs.</h3> : null}
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
          title="Paso 1: Dar de alta los requerimientos de la orden"
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
        <Button onClick={() => handleNext()}>Siguiente</Button>
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
    order: state.reducerOrders.order,
    user: state.reducerApp.user,
    customersTimes: state.reducerCustomers.customersTimes,
    plants: state.reducerZones.plants,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  get,
  deleted,
  create,
  orderSavePallets,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
