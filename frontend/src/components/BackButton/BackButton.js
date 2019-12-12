import React from 'react';
import useSubContext from '../../state/useSubContext';
import {
  StyledBackButton
} from './StyledBackButton';

const BackButton = (props) => {

  const dispatch = useSubContext('transactionState')[1];

  const back = () => {
    window.history.back();
    dispatch({ type: 'SET_LOGO', value: true })
  }

  return (
    <StyledBackButton onClick={back} size='50px' />
  )
}

export default BackButton