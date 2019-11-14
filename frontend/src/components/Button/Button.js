import React from 'react';
import { StyledButton } from "./StyledButton"



const Button = (props) => {


  return (
    <StyledButton text={props.text} fontSize={props.fontsize} width={props.width} height={props.height} onClick={props.onClick} className={props.className}>
      {props.text}
    </StyledButton>
  )
}

export default Button;
