import React from 'react';
import {
  StyledContainer,
  StyledLogo,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledBackArrow
} from './StyledCreateAccount';
import {
  Link,
} from 'react-router-dom';

const CreateAccount = () => {
  return (
    <StyledContainer>
      <Link to="/"><StyledBackArrow size='50' color='#fff' /></Link>
      <StyledForm>
        <StyledLogo src="/images/fishlogo.svg" alt="Fish logo" />
        <StyledInput type="text" placeholder="E-post" />
        <StyledInput type="password" placeholder="Lösenord" />
        <StyledInput type="password" placeholder="Bekräfta lösenord" />
        <StyledInput type="text" placeholder="Personnummer (ååååmmddcccc)" />
        <StyledButton>
          Skapa konto
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  )
}

export default CreateAccount;
