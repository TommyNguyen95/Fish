import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import BackButton from '../../components/BackButton';
import {
  StyledForm,
  StyledTextarea,
} from './StyledPaymentPage';

const PaymentPage = () => {
  return (
    <div>
      <BackButton to="/användare" />
      <StyledForm>
        <Input type="text" placeholder="Mottagare" />
        <Input type="number" placeholder="Belopp" />
        <StyledTextarea placeholder="Meddelande" />
        <Button text="Betala" />
      </StyledForm>
    </div>
  );
}

export default PaymentPage;
