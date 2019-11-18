import React from 'react';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  StyledConfirm,
  StyledLink
} from './StyledConfirmPayment';

const ConfirmPayment = () => {
  return (
    <div>
      <StyledConfirm>
        <Text text='Mottagare:' />
        <Text text='Belopp:' />
        <Text text='Meddelande:' />
        <Input placeholder="Fyll i ditt lösenord" />
        <StyledLink to={'/godkant'}>
          <Button text="Skicka betalning" />
        </StyledLink>
        <StyledLink to={'/betala'}>
          <Button text="Avbryt betalning" />
        </StyledLink>
      </StyledConfirm>
    </div>
  )
}

export default ConfirmPayment

