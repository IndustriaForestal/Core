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
const Samples = props => {
  const { samples, samplesColumns, user } = props
  const userId = user.id
  useEffect(() => {
    const topbar = {
      title: 'Muestreos',
      menu: {
        Muestreos: '/samples',
      },
    }
    props.setTitle(topbar)
    props.getAll('samples', 'GET_SAMPLES').then(() => {
      props.getAll('samples/columns', 'GET_SAMPLES_COLUMNS')
    })

    // eslint-disable-next-line
  }, [])

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          newData.user_id = userId
          props
            .create(`samples/columns`, 'CREATE_SAMPLE', newData)
            .then(() =>
              props.getAll('samples/columns', 'GET_SAMPLES_COLUMNS')
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
              `samples/columns/${oldData.id}`,
              'UPDATE_SAMPLE',
              newData
            )
            .then(() =>
              props.getAll('samples/columns', 'GET_SAMPLES_COLUMNS')
            )
            .then(() => resolve())
        }, 1000)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          props
            .deleted(`samples/columns/${oldData.id}`, 'DELETE_SAMPLE')
            .then(() =>
              props.getAll('samples/columns', 'GET_SAMPLES_COLUMNS')
            )
            .then(() => resolve())
        }, 1000)
      }),
  }

  if (samples && samplesColumns) {
    return (
      <>
        <div className="Home">
          {samples.map(s => (
            <IconHome
              icon={<RiDashboardLine />}
              url={`/samples/${s.id}`}
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
    samples: state.reducerSamples.samples,
    samplesColumns: state.reducerSamples.samplesColumns,
    user: state.reducerApp.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Samples)
