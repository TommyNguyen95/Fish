import React from 'react';
import {
  StyledContainer,
  StyledLogo,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledTextarea,
  StyledBackArrow
} from './StyledPaymentPage';
import { ArrowLeft } from 'react-feather';


// TODO: Remove StyledInput and StyledButton.
// should be it's own component to import
const PaymentPage = () => {
  return (
    <StyledContainer>
      <StyledBackArrow size='50' color='#fff' />
      <StyledForm>
        <StyledLogo src="/images/fishlogo.svg" alt="Fish logo" />
        <StyledInput type="text" placeholder="Mottagare" />
        <StyledInput type="number" placeholder="Belopp" />
        <StyledTextarea placeholder="Meddelande" />
        <StyledButton>
          Betala
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
}

export default PaymentPage;
