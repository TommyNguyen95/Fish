import React, { useState } from 'react';
import useSubContext from '../../state/useSubContext';
import Input from '../../components/Input'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import {
  StyledContainer,
  StyledForm,
} from './StyledCreateAccount';
import { createAccountFieldsData } from '../../staticData';
// import useFetch from '../../helpers/fetch'

const CreateAccount = () => {
  const [createAccountDetails, setCreateAccountDetails] = useState([]);
  const state = useSubContext('loginState')[0];

  const renderInputs = () => createAccountFieldsData.map(({ id, name, type, placeholder, capitalize }) => {
    if (name === 'confirmPassword') {
      return <Input key={id} name={name} type={type} placeholder={placeholder} capitalize={capitalize} onChange={checkPassword} />
    } else {
      return <Input key={id} name={name} type={type} placeholder={placeholder} capitalize={capitalize} onChange={handleInputs} />
    }
  });

  const createAccount = async (e) => {
    e.preventDefault()
    await fetch(`${state.apiEndpoint}/api/user`,
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createAccountDetails)
      })
      .then(res => { console.log(res) })
      .catch(res => { console.log(res) })
  }

  const handleInputs = (e) => {
    setCreateAccountDetails({ ...createAccountDetails, [e.target.getAttribute('name')]: e.target.value })
  }

  const checkPassword = (e) => {

    if (e.target.value !== createAccountDetails.password) {
      e.target.style.backgroundColor = '#f8d7da'
    } else {
      e.target.style.backgroundColor = '#fff'
    }

    console.log(createAccountDetails)
  }

  return (
    <StyledContainer>
      <BackButton to="/" />
      <StyledForm>
        {renderInputs()}
        <Button text="Skapa konto" onClick={createAccount} />
      </StyledForm>
    </StyledContainer>
  )
}

export default CreateAccount;
