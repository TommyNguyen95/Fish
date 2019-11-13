import React, { useState } from 'react';
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
import { createAccountFieldsData } from '../../staticData';

const CreateAccount = () => {
  const [createAccountDetails, setCreateAccountDetails] = useState({});

  const renderInputs = () => createAccountFieldsData.map(({ id, name, type, placeholder, capitalize }) => {
    if (name === 'confirmPassword') {
      return <StyledInput key={id} name={name} type={type} placeholder={placeholder} capitalize={capitalize} onChange={checkPassword} />
    } else {
      return <StyledInput key={id} name={name} type={type} placeholder={placeholder} capitalize={capitalize} onChange={handleInputs}/>
    }
  });

  const createAccount = () => {
    console.log('brittmarie')
  }

  const handleInputs = (e) => {
    setCreateAccountDetails({...createAccountDetails, [e.target.getAttribute('name')]:e.target.value})
  }

  const checkPassword = (e) => {
    
    if(e.target.value !== createAccountDetails.password){
      e.target.style.backgroundColor = '#f8d7da'
    }else {
      e.target.style.backgroundColor = '#fff'
    }
  }

  return (
    <StyledContainer>
      <Link to="/"><StyledBackArrow size='50' color='#fff' /></Link>
      <StyledForm>
        <StyledLogo src="/images/fishlogo.svg" alt="Fish logo" />
        {renderInputs()}
        <StyledButton onClick={createAccount}>
          Skapa konto
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  )
}

export default CreateAccount;
