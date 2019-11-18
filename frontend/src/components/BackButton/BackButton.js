import React from 'react';
import {
  StyledBackButton
} from './StyledBackButton';

const BackButton = (props) => {
  const back = () => {
    if (props.back) {
      props.back.history.goBack()
    } else {
      console.log(props.props)

      props.props.history.push(props.to)
    }

  }

  return (
    <StyledBackButton onClick={back} size='50px' />
  )
}

export default BackButton