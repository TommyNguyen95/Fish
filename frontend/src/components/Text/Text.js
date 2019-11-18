import React from 'react'
import {
  StyledText,
  TextContainer
} from './StyledText'

const Text = ({ text, textInput }) => {
  return (
    <TextContainer>
      <StyledText> {text} </StyledText>
      <StyledText> {textInput} </StyledText>
    </TextContainer>
  )
}

export default Text;