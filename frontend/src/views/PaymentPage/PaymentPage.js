import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import BackButton from '../../components/BackButton';
import {
  StyledTextarea,
} from './StyledPaymentPage';

const PaymentPage = () => {
  return (
    <div>
      <BackButton to="/användare" />
      <form>
        <Input type="text" placeholder="Mottagare" />
        <Input type="number" placeholder="Belopp" />
        <StyledTextarea placeholder="Meddelande" />
        <Button text="Betala" />
      </form>
    </div>
  );
}

export default PaymentPage;
