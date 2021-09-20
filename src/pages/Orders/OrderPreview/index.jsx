import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import MaterialTable from 'material-table'
import moment from 'moment'
import { setTitle, getAll, deleted, get, create } from '../../../actions/app'
import { orderSavePallets, checkPallets, orderStageOption } from '../actions'
import { MdClear, MdDone } from 'react-icons/md'
import Loading from '../../../components/Loading/Loading'
import Button from '../../../components/Button/Button'

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
      .then(() => {
        props.getAll('suppliers', 'GET_SUPPLIERS')
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
    suppliers,
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
    suppliers
  ) {
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

      qualityProcesses.map(process => {
        qualityFull.push(process)
        palletProcesses.map(pallet => {
          if (process.position === pallet.orden) {
            qualityFull.push(pallet)
          }
          return pallet
        })
        palletItemsProcesses.map(item => {
          if (process.position === item.orden) {
            qualityFull.push(item)
          }
          return item
        })
        return process
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

    const getTimeProductionSuppliers = () => {
      let bestMaterialSuppliers = []
      material.map(m => {
        const suppliersPerMaterial = suppliers
          .filter(supplier => supplier.material_id === m.id)
          .sort((a, b) => a.delivery_time - b.delivery_time)[0]

        return bestMaterialSuppliers.push({
          ...m,
          supplier: suppliersPerMaterial,
        })
      })

      return bestMaterialSuppliers
    }

    const handleSearchAndSliceSupplier = (timeProduction, pallet) => {
      const suppliersPerStage = getTimeProductionSuppliers()

      const stage =
        pallet.check_stage === 1
          ? 'Tarima'
          : pallet.check_stage === 2
          ? 'Madera Habilitada'
          : 'Trozo'

      const materialStage =
        pallet.check_stage !== 1 && pallet.check_stage !== 2
          ? 4
          : pallet.check_stage

      const search = timeProduction.map(time => time.material_in)

      const indexForSlice = search.indexOf(stage)

      const timeSliced = timeProduction.slice(0, indexForSlice + 1)

      const delivery_time = parseInt(
        suppliersPerStage.find(supplier => supplier.id === materialStage)
          .supplier.delivery_time
      )

      const time = moment(timeSliced[indexForSlice].time).subtract(
        delivery_time,
        'hours'
      )

      const onTime = moment().isBefore(time, 'hours')

      timeSliced.push({
        time: time.format('YYYY-MMM-DD HH:mm:ss'),
        onTime,
      })

      return timeSliced
    }

    const getTimeProduction = (qualityFinal, pallet) => {
      let initialDate = moment(pallet.date)

      let onTime = false

      const timeProduction = qualityFinal.reverse().map(process => {
        const timeMultipler = pallet.amount / process.amount

        const time = process.estimated
          ? process.estimated + Math.ceil(process.clearance / 2)
          : process.duration + Math.ceil(process.slack / 2)
        console.log(time)
        initialDate = initialDate.subtract(time * timeMultipler, 'hours')
        onTime = moment().isBefore(initialDate, 'hours')

        return {
          ...process,
          time: initialDate.format('YYYY-MM-DD HH:mm:ss'),
          onTime,
        }
      })

      return timeProduction
    }

    const handleSearchAndSlice = (timeProduction, pallet) => {
      const stage =
        pallet.check_stage === 1
          ? 'Tarima'
          : pallet.check_stage === 2
          ? 'Madera Habilitada'
          : 'Trozo'

      const search = timeProduction.map(time => time.material_in)

      const indexForSlice = search.lastIndexOf(stage)

      const timeSliced = timeProduction.slice(0, indexForSlice + 1)

      return timeSliced
    }

    const lookupPallets = {}

    pallets.map(item => (lookupPallets[item.id] = item.model))

    const mapedOrder = order.pallets.map(pallet => {
      const qualityFinal = getQualityMap(pallet)
      const timeProduction = getTimeProduction(qualityFinal, pallet)
      const timeSliced3 = handleSearchAndSlice(timeProduction, pallet)
      const timeSliced2 = handleSearchAndSlice(timeProduction, {
        check_stage: 2,
      })
      const timeSliced = handleSearchAndSlice(timeProduction, {
        check_stage: 1,
      })

      const timeSlicedSupplier3 = handleSearchAndSliceSupplier(
        timeProduction,
        pallet
      )
      const timeSlicedSupplier2 = handleSearchAndSliceSupplier(timeProduction, {
        check_stage: 2,
      })
      const timeSlicedSupplier = handleSearchAndSliceSupplier(timeProduction, {
        check_stage: 1,
      })

      return {
        ...pallet,
        timeProduction: timeSliced,
        timeProduction2: timeSliced2,
        timeProduction3: timeSliced3,
        timeProductionSupplier: timeSlicedSupplier,
        timeProductionSupplier2: timeSlicedSupplier2,
        timeProductionSupplier3: timeSlicedSupplier3,
      }
    })

    const countOnTime = (mapedOrder, stage) => {
      if (stage === 1) {
        const verify = mapedOrder.find(
          pallet =>
            pallet.timeProduction[pallet.timeProduction.length - 1].onTime ===
            false
        )
        const verifySupplier = mapedOrder.find(
          pallet =>
            pallet.timeProductionSupplier[
              pallet.timeProductionSupplier.length - 1
            ].onTime === false
        )

        return verify === undefined || verifySupplier === undefined
          ? true
          : false
      }
      if (stage === 2) {
        const verify = mapedOrder.find(
          pallet =>
            pallet.timeProduction2[pallet.timeProduction2.length - 1].onTime ===
            false
        )
        const verifySupplier = mapedOrder.find(
          pallet =>
            pallet.timeProductionSupplier2[
              pallet.timeProductionSupplier2.length - 1
            ].onTime === false
        )

        return verify === undefined || verifySupplier === undefined
          ? true
          : false
      }
      if (stage === 3) {
        const verify = mapedOrder.find(
          pallet =>
            pallet.timeProduction3[pallet.timeProduction3.length - 1].onTime ===
            false
        )
        const verifySupplier = mapedOrder.find(
          pallet =>
            pallet.timeProductionSupplier3[
              pallet.timeProductionSupplier3.length - 1
            ].onTime === false
        )

        return verify === undefined || verifySupplier === undefined
          ? true
          : false
      }
    }

    const countPallet = countOnTime(mapedOrder, 1)
    const countItem = countOnTime(mapedOrder, 2)
    const countRaw = countOnTime(mapedOrder, 3)

    const previewOptions = mapedOrder => {
      // eslint-disable-next-line
      mapedOrder.map(pallet => {
        if (
          pallet.timeProduction[pallet.timeProduction.length - 1].onTime ===
          true
        ) {
          props.orderStageOption({
            id: pallet.pallet_id,
            stage: 'stage1',
            check: 1,
          })
        }
        if (
          pallet.timeProduction2[pallet.timeProduction2.length - 1].onTime ===
          true
        ) {
          props.orderStageOption({
            id: pallet.pallet_id,
            stage: 'stage2',
            check: 1,
          })
        }
        if (
          pallet.timeProduction3[pallet.timeProduction3.length - 1].onTime ===
          true
        ) {
          props.orderStageOption({
            id: pallet.pallet_id,
            stage: 'stage3',
            check: 1,
          })
        }
        if (
          pallet.timeProductionSupplier[
            pallet.timeProductionSupplier.length - 1
          ].onTime === true
        ) {
          props.orderStageOption({
            id: pallet.pallet_id,
            stage: 'stage1_supplier',
            check: 1,
          })
        }
        if (
          pallet.timeProductionSupplier2[
            pallet.timeProductionSupplier2.length - 1
          ].onTime === true
        ) {
          props.orderStageOption({
            id: pallet.pallet_id,
            stage: 'stage2_supplier',
            check: 1,
          })
        }
        if (
          pallet.timeProductionSupplier3[
            pallet.timeProductionSupplier3.length - 1
          ].onTime === true
        ) {
          props.orderStageOption({
            id: pallet.pallet_id,
            stage: 'stage3_supplier',
            check: 1,
          })
        }
      })
    }

    return (
      <>
        <MaterialTable
          title="Vista Previa Orden"
          columns={[
            {
              title: 'Modelo',
              field: 'pallet_id',
              lookup: lookupPallets,
            },
            { title: 'Cantidad', field: 'amount' },
            {
              title: 'Tarima',
              field: 'amount',
              render: rowData => (
                <div
                  className={
                    rowData.timeProduction[rowData.timeProduction.length - 1]
                      .onTime
                      ? '--success'
                      : '--danger'
                  }
                >
                  {rowData.timeProduction[rowData.timeProduction.length - 1]
                    .onTime ? (
                    <MdDone />
                  ) : (
                    <MdClear />
                  )}
                </div>
              ),
            },

            {
              title: 'Madera Habilitada',
              field: 'amount',
              render: rowData => (
                <div
                  className={
                    rowData.timeProduction2[rowData.timeProduction2.length - 1]
                      .onTime
                      ? '--success'
                      : '--danger'
                  }
                >
                  {rowData.timeProduction2[rowData.timeProduction2.length - 1]
                    .onTime ? (
                    <MdDone />
                  ) : (
                    <MdClear />
                  )}
                </div>
              ),
            },
            {
              title: 'Trozo',
              field: 'amount',
              render: rowData => (
                <div
                  className={
                    rowData.timeProduction3[rowData.timeProduction3.length - 1]
                      .onTime
                      ? '--success'
                      : '--danger'
                  }
                >
                  {rowData.timeProduction3[rowData.timeProduction3.length - 1]
                    .onTime ? (
                    <MdDone />
                  ) : (
                    <MdClear />
                  )}
                </div>
              ),
            },
            {
              title: 'Tarima Proveedor',
              field: 'amount',
              render: rowData => (
                <div
                  className={
                    rowData.timeProductionSupplier[
                      rowData.timeProductionSupplier.length - 1
                    ].onTime
                      ? '--success'
                      : '--danger'
                  }
                >
                  {rowData.timeProductionSupplier[
                    rowData.timeProductionSupplier.length - 1
                  ].onTime ? (
                    <MdDone />
                  ) : (
                    <MdClear />
                  )}
                </div>
              ),
            },
            {
              title: 'Madera Habilitada Proveedor',
              field: 'amount',
              render: rowData => (
                <div
                  className={
                    rowData.timeProductionSupplier2[
                      rowData.timeProductionSupplier2.length - 1
                    ].onTime
                      ? '--success'
                      : '--danger'
                  }
                >
                  {rowData.timeProductionSupplier2[
                    rowData.timeProductionSupplier2.length - 1
                  ].onTime ? (
                    <MdDone />
                  ) : (
                    <MdClear />
                  )}
                </div>
              ),
            },

            {
              title: 'Trozo Proveedor',
              field: 'amount',
              render: rowData => (
                <div
                  className={
                    rowData.timeProductionSupplier3[
                      rowData.timeProductionSupplier3.length - 1
                    ].onTime
                      ? '--success'
                      : '--danger'
                  }
                >
                  {rowData.timeProductionSupplier3[
                    rowData.timeProductionSupplier3.length - 1
                  ].onTime ? (
                    <MdDone />
                  ) : (
                    <MdClear />
                  )}
                </div>
              ),
            },
            {
              title: 'Entrega',
              field: 'date',
              render: rowData => (
                <div>{moment(rowData.date).format('YYYY-MM-DD HH:mm:ss')}</div>
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
        />
        <Button className="btn --danger" onClick={() => props.history.goBack()}>
          Cancelar
        </Button>
        {countPallet ? (
          <Button
            onClick={() => {
              props.history.push('/orders/stock')
              previewOptions(mapedOrder)
            }}
          >
            Tarima
          </Button>
        ) : null}
        {countItem ? (
          <Button
            onClick={() => {
              props.history.push('/orders/stock-items')
              previewOptions(mapedOrder)
            }}
          >
            Madera Habilitada
          </Button>
        ) : null}
        {countRaw ? (
          <Button
            onClick={() => {
              props.history.push('/orders/stock-sawn')
              previewOptions(mapedOrder)
            }}
          >
            Trozo
          </Button>
        ) : null}
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
    suppliers: state.reducerSuppliers.suppliers,
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
  orderStageOption,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder)
