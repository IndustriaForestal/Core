import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import MaterialTable from 'material-table'
import moment from 'moment'
import { setTitle, getAll, deleted, get, create } from '../../../actions/app'
import { orderSavePallets, checkPallets, orderPalletStart } from '../actions'
import Loading from '../../../components/Loading/Loading'
import Button from '../../../components/Button/Button'
import Swal from 'sweetalert2'

const CreateOrder = props => {
  useEffect(() => {
    const topbar = {
      title: 'Crear Orden Stock',
      menu: {
        Pedidos: '/orders',
        'Crear Orden': '/orders/create',
      },
    }
    props.setTitle(topbar)
    props
      .getAll('customers', 'GET_CUSTOMERS')
      .then(() => {
        props.getAll('pallets', 'GET_PALLETS')
      })
      .then(() => {
        props.getAll('items', 'GET_ITEMS')
      })
      .then(() => {
        props.getAll('stock', 'GET_STOCK')
      })
      .then(() => {
        props.getAll('stock', 'GET_STOCK')
      })
      .then(() => {
        props.getAll('processes', 'GET_PROCESSES')
      })
      .then(() => {
        props.getAll('material', 'GET_MATERIAL')
      })
      .then(() => {
        props.getAll('qualities', 'GET_QUALITIES')
      })
      .then(() => {
        props.getAll('qualities/processes', 'GET_QUALITIES_PROCESSES')
      })
      .then(() => {
        props.getAll('processes/pallets', 'GET_PROCESSES_PALLETS')
      })
      .then(() => {
        props.getAll('processes/items', 'GET_PROCESSES_ITEMS')
      })
    // eslint-disable-next-line
  }, [])

  const {
    customers,
    pallets,
    order,
    stock,
    processesPallets,
    processesItems,
    qualities,
    qualitiesProcesses,
    items,
    processes,
    material,
    schedule,
    scheduleHolidays,
    scheduleConfig,
  } = props

  if (
    customers &&
    pallets &&
    stock &&
    processesPallets &&
    processesItems &&
    qualities &&
    qualitiesProcesses &&
    items &&
    processes &&
    material &&
    schedule &&
    scheduleHolidays &&
    scheduleConfig
  ) {
    // *Creando Orden de producción por

    const handleCreateOrderProduction = orderPallets => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Este proceso no se puede revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, crear',
      }).then(result => {
        if (result.isConfirmed) {
          props
            .create('orders', 'CREATE_ORDER', {
              ...order,
              pallets: orderPallets,
            })
            .then(() => {
              props.history.push('/')
            })
        }
      })
    }

    //   *Mapear las calidades y agregar procesos adicionales

    const getQualityMap = pallet => {
      const palletFull = pallets.find(
        p => parseInt(p.id) === parseInt(pallet.pallet_id)
      )
      const qualityProcesses = qualitiesProcesses.filter(
        quality =>
          parseInt(quality.quality_id) === parseInt(palletFull.quality_id)
      )

      const palletProcesses = processesPallets.filter(
        process => parseInt(process.pallet_id) === parseInt(palletFull.id)
      )

      const palletItems = items.filter(
        item => parseInt(item.id_pallet) === parseInt(palletFull.id)
      )

      const palletItemsProcesses = getItemsProcess(palletItems)

      let qualityFull = []
      // eslint-disable-next-line
      qualityProcesses.map(process => {
        qualityFull.push({ ...process, type_process: 0 })
        // eslint-disable-next-line
        palletProcesses.map(pallet => {
          if (process.position === pallet.orden) {
            qualityFull.push({ ...pallet, type_process: 1 })
          }
        })
        // eslint-disable-next-line
        palletItemsProcesses.map(item => {
          if (process.position === item.orden) {
            qualityFull.push({ ...item, type_process: 2 })
          }
        })
      })

      qualityFull = qualityFull.map(item => {
        const processDetail = processes.find(
          process => parseInt(process.id) === parseInt(item.process_id)
        )
        return {
          ...item,
          material_in: material.find(
            m => parseInt(m.id) === parseInt(processDetail.material_in)
          ).name,
          material_in_id: material.find(
            m => parseInt(m.id) === parseInt(processDetail.material_in)
          ).id,
          process_name: processDetail.name,
        }
      })

      return qualityFull
    }

    const getItemsProcess = palletItems => {
      let concatArrays = []

      palletItems.map(item =>
        processesItems
          .filter(process => parseInt(process.item_id) === parseInt(item.id))
          .map(process => concatArrays.push(process))
      )

      return concatArrays
    }

    /* Funcion que crea tiempos estimados de proceso */

    const getTimeProduction = (qualityFinal, pallet) => {
      let initialDate = moment(pallet.date)
      // Se resta un dia a la fecha de entrega de la tarima
      initialDate = initialDate.subtract(1, 'days').hour(scheduleConfig[0].end)
      let onTime = false

      // Se obtiene el tiempo de produccion de cada material
      const timeProduction = qualityFinal.reverse().map(process => {
        const timeMultipler = pallet.amount / process.amount

        const time = process.estimated
          ? process.estimated + Math.ceil(process.clearance / 2)
          : process.duration + Math.ceil(process.slack / 2)

        const start = scheduleConfig[0].start
        const end = scheduleConfig[0].end
        const hours = Math.ceil(time * timeMultipler)

        // Proceso de estufado base de datos id 44 tabla processes
        if (process.process_id === 44 || process.process_id === 50) {
          initialDate = initialDate.subtract(hours, 'hours')
          const startDate = moment(initialDate).hour(start).minute(0).second(0)
          const endDate = moment(initialDate).hour(end).minute(0).second(0)
          if (
            !moment(initialDate).isSameOrAfter(startDate) &&
            moment(initialDate).isSameOrBefore(endDate)
          ) {
            initialDate = initialDate.subtract(1, 'days').hour(end).minute(0)
          } else if (
            moment(initialDate).isSameOrAfter(startDate) &&
            !moment(initialDate).isSameOrBefore(endDate)
          ) {
            initialDate = initialDate.hour(end).minute(0)
          }
        } else {
          const tempDate = moment(initialDate).subtract(hours, 'hours')
          const startDate = moment(tempDate).hour(start).minute(0).second(0)
          const endDate = moment(tempDate).hour(end).minute(0).second(0)

          if (
            moment(tempDate).isSameOrAfter(startDate) &&
            moment(tempDate).isSameOrBefore(endDate)
          ) {
            initialDate = initialDate.subtract(hours, 'hours')
          } else {
            let hoursLeft = initialDate.diff(startDate, 'hours')
            let hoursNextDay = hours - hoursLeft

            while (hoursNextDay > 0) {
              initialDate = initialDate.subtract(hoursLeft, 'hours')
              initialDate = initialDate.subtract(1, 'days').hour(end).minute(0)
              initialDate = initialDate.subtract(hoursNextDay, 'hours')

              hoursNextDay = 0
            }
          }
        }

        onTime = moment().isBefore(initialDate, 'hours')

        return {
          ...process,
          amount: pallet.amount,
          time: initialDate.format('YYYY-MM-DD HH:mm:ss'),
          onTime,
        }
      })

      return timeProduction
    }
    const handleSearchAndSlice = (timeProduction, pallet) => {
      let stage = 'Trozo'

      if (
        parseInt(pallet.amount_stock) > 0 ||
        parseInt(pallet.amount_stock_supplier) > 0
      ) {
        stage = 'Tarima'
      }
      if (
        pallet.amount_items.length > 0 ||
        pallet.amount_items_supplier.length > 0
      ) {
        stage = 'Madera Habilitada'
      }
      if (
        pallet.amount_sawn &&
        (pallet.amount_sawn.length > 0 ||
          pallet.amount_sawn_supplier.length > 0)
      ) {
        stage = 'Trozo'
      }

      const search = timeProduction.map(time => time.material_in)

      const indexForSlice = search.lastIndexOf(stage)

      let timeSliced

      if (stage === 'Trozo' && pallet.sawnStage === true) {
        timeSliced = timeProduction.slice(0, indexForSlice)
      } else {
        timeSliced = timeProduction.slice(0, indexForSlice + 1)
      }

      console.log(stage, search, indexForSlice, timeSliced, pallet)

      return timeSliced
    }

    const handleSearchAndSliceTimes = (timeProduction, pallet) => {
      let stage

      if (
        parseInt(pallet.amount_stock) > 0 ||
        parseInt(pallet.amount_stock_supplier) > 0
      ) {
        stage = 'Tarima'
      }
      if (
        pallet.amount_items.length > 0 ||
        pallet.amount_items_supplier.length > 0
      ) {
        stage = 'Madera Habilitada'
      }
      if (
        pallet.amount_sawn &&
        (pallet.amount_sawn.length > 0 ||
          pallet.amount_sawn_supplier.length > 0)
      ) {
        stage = 'Trozo'
      }

      const search = timeProduction.map(time => time.material_in)

      const indexForSlice = search.lastIndexOf(stage)

      const timeSliced = timeProduction.slice(0, indexForSlice + 1)

      if (pallet.amount_stock > 0 || pallet.amount_stock_supplier > 0) {
        const indexForSlicePallet = search.lastIndexOf('Tarima')
        const timeSlicedPallet = timeProduction.slice(
          0,
          indexForSlicePallet + 1
        )

        const time = timeSlicedPallet[timeSlicedPallet.length - 1].time

        props.orderPalletStart({
          id: pallet.pallet_id,
          time,
          stage: 'pallets_time',
        })
      }
      if (
        pallet.amount_items.length > 0 ||
        pallet.amount_items_supplier.length > 0
      ) {
        const indexForSliceItems = search.lastIndexOf('Madera Habilitada')
        const timeSlicedItems = timeProduction.slice(0, indexForSliceItems + 1)
        const time = timeSlicedItems[timeSlicedItems.length - 1].time

        props.orderPalletStart({
          id: pallet.pallet_id,
          time,
          stage: 'items_time',
        })
      }
      if (
        pallet.amount_sawn.length > 0 ||
        pallet.amount_sawn_supplier.length > 0
      ) {
        const indexForSliceSwan = search.lastIndexOf('Trozo')
        const timeSlicedSwan = timeProduction.slice(0, indexForSliceSwan + 1)
        const time = timeSlicedSwan[timeSlicedSwan.length - 1].time

        props.orderPalletStart({
          id: pallet.pallet_id,
          time,
          stage: 'sawn_time',
        })
      }

      return timeSliced
    }

    const lookupPallets = {}

    pallets.map(item => (lookupPallets[item.id] = item.model))

    const mapedOrder = order.pallets.map(pallet => {
      const qualityFinal = getQualityMap(pallet)
      const timeProduction = getTimeProduction(qualityFinal, pallet)
      const timeSliced = handleSearchAndSlice(timeProduction, pallet)

      return {
        ...pallet,
        timeProduction: timeSliced,
      }
    })

    const handleTimes = order => {
      order.pallets.map(pallet => {
        const qualityFinal = getQualityMap(pallet)
        const timeProduction = getTimeProduction(qualityFinal, pallet)
        const timeSliced = handleSearchAndSliceTimes(timeProduction, pallet)

        return {
          ...pallet,
          timeProduction: timeSliced,
        }
      })
    }

    return (
      <>
        <MaterialTable
          title="Completar Orden"
          columns={[
            {
              title: 'Modelo',
              field: 'pallet_id',
              lookup: lookupPallets,
            },
            { title: 'Cantidad', field: 'amount' },
            { title: 'Entrega', field: 'date' },
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
          data={mapedOrder}
          detailPanel={rowData => {
            return (
              <>
                <table
                  style={{
                    width: '100%',
                    padding: '15px',
                    textAlign: 'center',
                  }}
                >
                  <thead>
                    <tr>
                      <th>Proceso</th>
                      <th>Materiales</th>
                      <th>Inicio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowData.timeProduction.map((process, index) => (
                      <tr key={index}>
                        <td>{process.process_name}</td>
                        <td>{process.material_in}</td>
                        <td>{process.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )
          }}
          options={{
            rowStyle: rowData => ({
              backgroundColor: rowData.check === 1 ? '#90be6d' : null,
              color: rowData.check === 1 ? '#FFFFFF' : null,
            }),
          }}
        />
        <Button className="btn --danger" onClick={() => props.history.goBack()}>
          Cancelar
        </Button>
        <Button onClick={() => handleCreateOrderProduction(mapedOrder)}>
          Finalizar
        </Button>
      </>
    )
  } else {
    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    customers: state.reducerCustomers.customers,
    stock: state.reducerStock.stock,
    pallets: state.reducerPallets.pallets,
    items: state.reducerItems.items,
    order: state.reducerOrders.order,
    user: state.reducerApp.user,
    processesPallets: state.reducerProcesses.processesPallets,
    processes: state.reducerProcesses.processes,
    processesItems: state.reducerProcesses.processesItems,
    qualities: state.reducerQualities.qualities,
    qualitiesProcesses: state.reducerQualities.qualitiesProcesses,
    material: state.reducerMaterial.material,
    schedule: state.reducerSchedule.schedule,
    scheduleHolidays: state.reducerSchedule.scheduleHolidays,
    scheduleConfig: state.reducerSchedule.scheduleConfig,
  }
}

const mapDispatchToProps = {
  setTitle,
  getAll,
  get,
  deleted,
  create,
  orderSavePallets,
  checkPallets,
  orderPalletStart,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
