import React from 'react'
import { Link } from 'react-router-dom'
import Text from '../../components/Text/Text'
import Button from '../../components/Button/Button'
import BackButton from '../../components/BackButton';
import './ChildPageStyles.scss'
import useSubContext from '../../state/useSubContext';

const ChildPage = (props) => {

  const state = useSubContext('loginState')[0];

  const Child = () => {
    return (
      state.loginState.relations.map((child, i) => {
        if (child._id === props.match.params.id) {
          return <div key={i} className="child-page-main">
            <Text text="E-post" textInput={child.username}></Text>
            <Text text="Belopp" textInput={child.balance}></Text>
          </div>
        }
      })
    )
  }


  return (
    <div className="child-page-container">
      <BackButton to="anvandare" />
      <Child />
      <Link to={{ pathname: '/historik', state: { child: props.match.params.id, url: 'barn' } }} >
        <Button text="Betalnings Historik" />
      </Link>
    </div>
  )
}
export default ChildPage