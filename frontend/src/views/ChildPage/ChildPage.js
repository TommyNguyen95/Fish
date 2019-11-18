import React from 'react'
import './ChildPageStyles.scss'
import Text from '../../components/Text/Text'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'


const ChildPage = () => {
  return (
    <div className="child-page-container">
      <div className="child-page-main">
        <Text text="E-post" textInput="Skunk@lunk.1337"></Text>
        <Text text="Belopp" textInput="1337kr"></Text>
      </div>
      <Link to="/transaktioner">
        <Button text="Betalnings Historik" />
      </Link>
    </div>
  )
}
export default ChildPage