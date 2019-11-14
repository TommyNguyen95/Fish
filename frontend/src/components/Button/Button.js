import React from 'react';
import { StyledButton } from "./StyledButton"



const Button = (props) => {


  return (
    <StyledButton text={props.text} onClick={props.onClick} >
      {props.text}
    </StyledButton>
  )
}

export default Button;
