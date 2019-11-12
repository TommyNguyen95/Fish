import React from 'react';
import {
  StyledInput
} from './StyledInput';

const Input = ({ val, type, keyValue, onChange }) => {

  /*const _onChange = () => {
    console.log('funktion, callback')
  }*/

  return (
    <StyledInput
      value={val}
      onChange={onChange}
      type={type}
      key={keyValue}
    />
  )
}

export default Input;