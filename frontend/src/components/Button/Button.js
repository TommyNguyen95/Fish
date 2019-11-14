import React from 'react';
import { StyledButton } from "./StyledButton"



const Button = (props) => {


  return (
    <StyledButton text={props.text} onClick={props.onClick} className={props.className} fontsize={props.fontsize}>
      {props.text}
    </StyledButton>
  )
}

export default Button;
