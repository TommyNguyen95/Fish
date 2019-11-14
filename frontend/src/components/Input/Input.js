import React from 'react';
import {
  StyledInput
} from './StyledInput';

const Input = ({ val, name, type, placeholder, keyValue, onChange }) => {

  /*const _onChange = () => {
    console.log('funktion, callback')
  }*/

  return (
    <StyledInput
      name={name}
      value={val}
      onChange={onChange}
      type={type}
      key={keyValue}
      placeholder={placeholder}
    />
  )
}

export default Input;