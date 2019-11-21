import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useRouteMatch } from 'react-router-dom'
import Text from '../../components/Text/Text'
import Button from '../../components/Button/Button'
import './ChildPageStyles.scss'

const ChildPage = () => {

  let match = useRouteMatch("barn-profil/:id")
  // axios.get



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