import React from 'react';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useSubContext from '../../state/useSubContext';
import {
  StyledConfirm,
  StyledLink
} from './StyledConfirmPayment';

const ConfirmPayment = () => {

  const [state, dispatch] = useSubContext('transactionState');

  return (
    <div>
      <StyledConfirm>
        <Text text='Mottagare:' />
        <Text text='Belopp:' />
        <Text text='Meddelande:' textInput={state.transactionState.message} />
        <Input placeholder="Fyll i ditt lösenord" />
        <StyledLink to={'/bekraftat'}>
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

