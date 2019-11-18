import React, { useState } from 'react';
import useSubContext from '../../state/useSubContext';
import Input from '../../components/Input'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import { createAccountFieldsData } from '../../staticData';
// import useFetch from '../../helpers/fetch'

const CreateAccount = () => {
  const [createAccountDetails, setCreateAccountDetails] = useState([]);
  const [kimError, setKimError] = useState(false)
  const state = useSubContext('loginState')[0];

  const renderInputs = () => createAccountFieldsData.map(({ id, name, type, placeholder, capitalize }) => {
    if (name === 'confirmPassword') {
      return kimError ? <Input bg={"#f8d7da"} key={id} name={name} type={type} placeholder={placeholder} capitalize={capitalize} onChange={checkPassword} /> : <Input key={id} name={name} type={type} placeholder={placeholder} capitalize={capitalize} onChange={checkPassword} />
    } else {
      return <Input key={id} name={name} type={type} placeholder={placeholder} capitalize={capitalize} onChange={handleInputs} />
    }
  });

  const createAccount = async (e) => {
    e.preventDefault()
    if (createAccountDetails.password === createAccountDetails.confirmPassword && createAccountDetails.confirmPassword) {
      await fetch(`${state.apiEndpoint}/api/user`,
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(createAccountDetails)
        })
        .then(res => { console.log(res) })
        .catch(res => { console.log(res) })
    } else if (!createAccountDetails.confirmPassword || createAccountDetails.confirmPassword !== createAccountDetails.password) {
      setKimError(true)
    }
  }

  const handleInputs = (e) => {
    setCreateAccountDetails({ ...createAccountDetails, [e.target.getAttribute('name')]: e.target.value })
  }

  const checkPassword = (e) => {

    setCreateAccountDetails({ ...createAccountDetails, [e.target.getAttribute('name')]: e.target.value })

    if (e.target.value !== createAccountDetails.password) {
      e.target.style.backgroundColor = '#f8d7da'
    } else {
      e.target.style.backgroundColor = '#fff'
    }

    console.log(createAccountDetails)
  }

  return (
    <div>
      <BackButton to="/" />
      <form>
        {renderInputs()}
        <Button text="Skapa konto" onClick={createAccount} />
      </form>
    </div>
  )
}

export default CreateAccount;
