import React from 'react';
import useSubContext from '../../state/useSubContext';
import {
  StyledBackButton
} from './StyledBackButton';

const BackButton = (props) => {

  const dispatch = useSubContext('transactionState')[1];

  const back = () => {
    console.log(props)
    if (props.back) {
      props.back.history.goBack()
    } else {
      props.props.history.push(props.to)
    }
    dispatch({ type: 'SET_LOGO', value: true })
  }

  return (
    <StyledBackButton onClick={back} size='50px' />
  )
}

export default BackButton