import React from 'react';
import Logo from "../../components/Logo/Logo"
import {
  StyledContainer,
  StyledVerifyMessage
} from './StyledVerifyPage';

const VerifyPage = () => {
  return (
    <StyledContainer>
      <Logo />
      <StyledVerifyMessage>
        Bekräfta din epost genom länken i mejlet skickat till dig!
      </StyledVerifyMessage>
    </StyledContainer>
  )
}

export default VerifyPage;

