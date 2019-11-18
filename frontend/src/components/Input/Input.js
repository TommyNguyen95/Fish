import React from 'react';
import {
  StyledInput
} from './StyledInput';

const Input = ({ val, name, capitalize, type, placeholder, keyValue, onChange, bg }) => {

  /*const _onChange = () => {
    console.log('funktion, callback')
  }*/

  return (
    <StyledInput
      style={{ backgroundColor: bg }}
      name={name}
      value={val}
      onChange={onChange}
      type={type}
      key={keyValue}
      placeholder={placeholder}
      capitalize={capitalize}
    />
  )
}

export default Input;