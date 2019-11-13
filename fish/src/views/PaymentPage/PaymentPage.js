import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Logo from '../../components/Logo';
import BackButton from '../../components/BackButton';
import {
  StyledContainer,
  StyledForm,
  StyledTextarea,
} from './StyledPaymentPage';

const PaymentPage = () => {
  return (
    <StyledContainer>
      <BackButton to="/user" />
      <StyledForm>
        <Logo src="/images/fishlogo.svg" alt="Fish logo" />
        <Input type="text" placeholder="Mottagare" />
        <Input type="number" placeholder="Belopp" />
        <StyledTextarea placeholder="Meddelande" />
        <Button width="100%" text="Betala"/>
      </StyledForm>
    </StyledContainer>
  );
}

export default PaymentPage;
