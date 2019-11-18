import React from 'react';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  StyledConfirm
} from './StyledConfirmPayment';

const ConfirmPayment = () => {
  return (
    <div>
      <StyledConfirm>
        <Text text='Mottagare:' />
        <Text text='Belopp:' />
        <Text text='Meddelande:' />
        <Input placeholder="Fyll i ditt lösenord"/>
        <Button text="Skicka betalning" />
        <Button text="Avbryt betalning" />
      </StyledConfirm>
    </div>
  )
}

export default ConfirmPayment

