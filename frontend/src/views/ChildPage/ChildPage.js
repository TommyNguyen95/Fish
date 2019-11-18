import React from 'react'
import './ChildPageStyles.scss'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'


const ChildPage = () => {
  return (
    <div className="child-page-container">
      <div className="child-page-main">
        <h3>E-post: Skunk@lunk.1337</h3>
        <h3>Belopp: 1337kr</h3>
      </div>
      <Link to="/transaktioner">
        <Button text="Betalnings Historik" />
      </Link>
    </div>
  )
}
export default ChildPage