import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  getAll,
  create,
  update,
  setTitle,
  deleted,
} from '../../actions/app'
import Loading from '../../components/Loading/Loading'
import MaterialTable from 'material-table'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Swal from 'sweetalert2'

const Samples = props => {
  const {
    samples,
    samplesColumns,
    user,
    ordersProduction,
    ordersWork,
    orders,
    processes,
  } = props
  const [data, setData] = useState([])
  const [orderSelected, setOrder] = useState(0)
  const [orderProductionSelected, setProductionOrder] = useState(0)
  const [orderWorkSelected, setWorkOrder] = useState(0)

  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Muestreos',
      menu: {
        Muestreos: '/samples',
      },
    }
    props.setTitle(topbar)
    props
      .getAll('samples', 'GET_SAMPLES')
      .then(() => {
        props.getAll('samples/columns', 'GET_SAMPLES_COLUMNS')
      })
      .then(() => {
        props.getAll('orders', 'GET_ORDERS')
      })
      .then(() => {
        props.getAll('orders/production', 'GET_ORDERS_PRODUCTION')
      })
      .then(() => {
        props.getAll('orders/work', 'GET_ORDERS_WORK')
      })
      .then(() => {
        props.getAll('processes', 'GET_PROCESSES')
      })

    // eslint-disable-next-line
  }, [])

  const { id } = useParams()

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          setData([...data, newData])
          resolve()
        }, 1)
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataUpdate = [...data]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setData([...dataUpdate])

          resolve()
        }, 1)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setData([
            ...data.filter(
              data => data.tableData.id !== oldData.tableData.id
            ),
          ])
          resolve()
        }, 1)
      }),
  }

  const HandleSave = () => {
    if (orderWorkSelected > 0) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Este proceso no se puede revertir',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar',
      }).then(result => {
        if (result.isConfirmed) {
          props.create(
            `samples/data/${id}/${orderWorkSelected}`,
            'CREATE_SAMPLE',
            data
          )
          Swal.fire('Guardado!', 'Guardado con exito.', 'success')
          props.history.push('/samples')
        }
      })
    } else {
      Swal.fire(
        'Cuidado!',
        'Selecciona una orden de trabajo.',
        'info'
      )
    }
  }

  if (
    samples &&
    samplesColumns &&
    ordersProduction &&
    ordersWork &&
    orders &&
    processes
  ) {
    const lookupSamples = {}

    samples.map(item => (lookupSamples[item.id] = item.name))

    const sample = samples.find(
      item => parseInt(item.id) === parseInt(id)
    )

    const columns = samplesColumns.filter(
      item => parseInt(item.sample_id) === parseInt(id)
    )

    return (
      <>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          <div className="inputGroup">
            <label htmlFor="">
              <span>Orden</span>
              <select
                onChange={e => setOrder(parseInt(e.target.value))}
                name=""
                id=""
              >
                <option value="">Seleccione una opción</option>
                {orders.map(order => (
                  <option value={order.id}>Orden #{order.id}</option>
                ))}
              </select>
            </label>
          </div>
          {orderSelected > 0 ? (
            <div className="inputGroup">
              <label htmlFor="">
                <span>Orden de producción</span>
                <select
                  onChange={e =>
                    setProductionOrder(parseInt(e.target.value))
                  }
                  name=""
                  id=""
                >
                  <option value="">Seleccione una opción</option>
                  {ordersProduction
                    .filter(op => op.order_id === orderSelected)
                    .sort((a, b) => a.order_number - b.order_number)
                    .map(order => (
                      <option value={order.id}>
                        Orden de producción -{' '}
                        {
                          processes.find(
                            p => p.id === order.process_id
                          ).name
                        }
                      </option>
                    ))}
                </select>
              </label>
            </div>
          ) : null}

          {orderProductionSelected > 0 ? (
            <div className="inputGroup">
              <label htmlFor="">
                <span>Orden de trabajo</span>
                <select
                  onChange={e =>
                    setWorkOrder(parseInt(e.target.value))
                  }
                  name=""
                  id=""
                >
                  <option value="">Seleccione una opción</option>
                  {ordersWork
                    .filter(
                      op => op.op_id === orderProductionSelected
                    )
                    .map(order => (
                      <option value={order.id}>
                        Orden de trabajo -{' '}
                        {
                          processes.find(
                            p => p.id === order.process_id
                          ).name
                        }
                      </option>
                    ))}
                </select>
              </label>
            </div>
          ) : null}
        </div>
        <MaterialTable
          columns={columns.map(column => {
            return {
              title: column.name,
              field: `${column.id}`,
            }
          })}
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
          data={data}
          editable={editable}
          title={sample.name}
        />
        {data.length > 0 ? (
          <Button type="text" onClick={HandleSave}>
            Guardar
          </Button>
        ) : null}
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
    samples: state.reducerSamples.samples,
    samplesColumns: state.reducerSamples.samplesColumns,
    user: state.reducerApp.user,
    ordersProduction: state.reducerOrders.ordersProduction,
    ordersWork: state.reducerOrders.ordersWork,
    orders: state.reducerOrders.orders,
    processes: state.reducerProcesses.processes,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Samples)
