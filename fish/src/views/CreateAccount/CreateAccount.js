import React from 'react';
import {
  StyledContainer,
  StyledLogo,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledBackArrow,
  NameInput
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
        <NameInput type="text" name="firstname" placeholder="Namn" />
        <NameInput type="text" name="lastname" placeholder="Efternamn" />
        <StyledInput type="text" name="email" placeholder="E-post" />
        <StyledInput type="password" placeholder="Lösenord" />
        <StyledInput type="password" placeholder="Bekräfta lösenord" />
        <StyledInput type="text" placeholder="Personnummer (ååååmmddxxxx)" />
        <StyledButton>
          Skapa konto
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  )
}

export default CreateAccount;
