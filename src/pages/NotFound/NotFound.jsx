import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '../../components/Button/Button'
import Title from '../../components/Title/Title'
import iconError from '../../assets/static/404.svg'
import { setTitle } from '../../actions/app'
import './NotFound.scss'

const NotFound = props => {
  useEffect(() => {
    const topbar = { title: '404 Error!', menu: { Inicio: '/' } }
    props.setTitle(topbar)
  })
  return (
    <div className="notFound">
      <img
        src={iconError}
        alt="404"
      />
      <Title>Error 404</Title>
      <h2>Opps. The page you are looking for got lost.</h2>
      <Link to="/">
        <Button type="button">Regresar</Button>
      </Link>
    </div>
  )
}

const mapDispatchToProps = {
  setTitle,
}

export default connect(null, mapDispatchToProps)(NotFound)
