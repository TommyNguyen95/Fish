import React from 'react';
import Logo from "../../components/Logo"
import BackButton from '../../components/BackButton';
import {
  StyledContainer,
  StyledVerifyMessage,
  StyledText
} from './StyledVerifyPage';

const VerifyPage = () => {
  return (
    <StyledContainer>
      <BackButton to="/"/>
      <Logo />
      <StyledVerifyMessage>
        <StyledText>
          Bekräfta din epost genom länken i mejlet skickat till dig!
        </StyledText>
      </StyledVerifyMessage>
    </StyledContainer>
  )
}

export default VerifyPage;

