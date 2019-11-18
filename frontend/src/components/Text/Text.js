import React from 'react'
import {
  StyledText
} from './StyledText'

const Text = (props) => {
  return (
    <StyledText text={props.text}>
      {props.text}
    </StyledText>
  )
}

export default Text;