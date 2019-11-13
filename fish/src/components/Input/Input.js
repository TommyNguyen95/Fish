import React from 'react';
import {
  StyledInput
} from './StyledInput';

const Input = ({ val, placeholder, type, keyValue, onChange }) => {

  /*const _onChange = () => {
    console.log('funktion, callback')
  }*/

  return (
    <StyledInput
      value={val}
      onChange={onChange}
      type={type}
      key={keyValue}
      placeholder={placeholder}
    />
  )
}

export default Input;