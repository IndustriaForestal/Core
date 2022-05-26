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
import Input from '../../components/Input/Input'
import { useForm } from 'react-hook-form'

const Reports = props => {
  const { reports, reportsParams, reportsData, user } = props
  const { register, handleSubmit, errors } = useForm()
  const [data, setData] = useState([])
  const [columnsData, setColumnsData] = useState([])
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Reportes',
      menu: {
        Reportes: '/reports',
      },
    }
    props.setTitle(topbar)
    props
      .getAll('reports', 'GET_REPORTS')
      .then(() => {
        props.getAll('reports/params', 'GET_REPORTS_PARAMS')
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

  useEffect(() => {
    setData(reportsData)
    if (reportsData && reportsData.length > 0) {
      setColumnsData(
        Object.keys(reportsData[0]).map(key => {
          return {
            title: key,
            field: key,
          }
        })
      )
    } else {
      setColumnsData([])
    }
    // eslint-disable-next-line
  }, [setData, reportsData])

  const { id } = useParams()

  const onSubmit = data => {
    setData([])
    props.create(`reports/report/${id}`, 'GENERATE_REPORT', data)
  }

  if (reports && reportsParams) {
    const report = reports.find(
      item => parseInt(item.id) === parseInt(id)
    )

    const params = reportsParams.filter(
      item => parseInt(item.report_id) === parseInt(id)
    )

    return (
      <>
        <form
          id="formTarima"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          {params.map(param => (
            <Input
              type="text"
              name={param.name}
              title={param.name}
              passRef={register}
            />
          ))}
          <Button type="submit" className="btn">
            Generar
          </Button>
        </form>
        <MaterialTable
          columns={columnsData}
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
          title={report.name}
          options={{
            exportButton: true,
            exportAllData: true,
            pageSize: 50,
            pageSizeOptions: [50, 100, 150],
            emptyRowsWhenPaging: false,
          }}
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
    reports: state.reducerReports.reports,
    reportsParams: state.reducerReports.reportsParams,
    reportsData: state.reducerReports.reportsData,
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
