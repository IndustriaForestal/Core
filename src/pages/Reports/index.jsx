import React, { useEffect } from 'react'
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
import { RiDashboardLine } from 'react-icons/ri'
import IconHome from '../Home/IconHome/IconHome.jsx'
const Reports = props => {
  const { reports, reportsParams, user } = props
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Reportes',
      menu: {
        Reportes: '/reports',
      },
    }
    props.setTitle(topbar)
    props.getAll('reports', 'GET_REPORTS').then(() => {
      props.getAll('reports/params', 'GET_REPORTS_PARAMS')
    })

    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`reports/params`, 'CREATE_REPORT', newData)
            .then(() =>
              props.getAll('reports/params', 'GET_REPORTS_PARAMS')
            )
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
              `reports/params/${oldData.id}`,
              'UPDATE_REPORT',
              newData
            )
            .then(() =>
              props.getAll('reports/params', 'GET_REPORTS_PARAMS')
            )
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`reports/params/${oldData.id}`, 'DELETE_REPORT')
            .then(() =>
              props.getAll('reports/params', 'GET_REPORTS_PARAMS')
            )
            .then(() => resolve())
        }, 1000)
      }),
  }

  if (reports && reportsParams) {
    return (
      <>
        <div className="Home">
          {reports.map(s => (
            <IconHome
              icon={<RiDashboardLine />}
              url={`/reports/${s.id}`}
              text={`${s.name}`}
            />
          ))}
        </div>
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
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
