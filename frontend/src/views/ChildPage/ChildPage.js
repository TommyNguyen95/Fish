import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useRouteMatch } from 'react-router-dom'
import Text from '../../components/Text/Text'
import Button from '../../components/Button/Button'
import './ChildPageStyles.scss'
import useSubContext from '../../state/useSubContext';

const ChildPage = (props) => {

  const [state, dispatch] = useSubContext('loginState');

  const Barnen = () => {
    return (
      state.loginState.relations.map((x, i) => {
        if (x._id == props.match.params.id) {
          return <div key={i}>{x._id}</div>
        }
      })
    )
  }

  return (
    <div className="child-page-container">
      <div className="child-page-main">
        <Text text="E-post" textInput={'britt'}></Text>
        <Text text="Belopp" textInput="1337kr"></Text>
      </div>
      <Barnen />
      <Link to="/transaktioner">
        <Button text="Betalnings Historik" />
      </Link>
    </div>
  )
}
export default ChildPage