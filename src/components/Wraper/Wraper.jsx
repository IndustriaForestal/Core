import React from 'react'
import { connect } from 'react-redux'
import './Wraper.scss'

const Wraper = ({ children, wraper }) => {
  return (
    <div className={wraper ? 'wraper --scrollX' : 'wraper'}>
      <div className="container">{children}</div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    wraper: state.reducerApp.wraper,
  }
}

export default connect(mapStateToProps, null)(Wraper)
