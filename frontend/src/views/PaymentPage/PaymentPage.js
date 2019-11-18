import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import BackButton from '../../components/BackButton';
import {
  StyledTextarea,
  StyledLink
} from './StyledPaymentPage';

const PaymentPage = () => {
  return (
    <div>
      <BackButton to="/anvandare" />
      <form>
        <Input type="text" placeholder="Mottagare" />
        <Input type="number" placeholder="Belopp" />
        <StyledTextarea placeholder="Meddelande" />
        <StyledLink to={'/bekrafta'}>
          <Button text="Betala" />
        </StyledLink>
      </form>
    </div>
  );
}

export default PaymentPage;
