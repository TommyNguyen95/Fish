import React, { useState } from 'react';
import useSubContext from '../../state/useSubContext';
import Input from '../../components/Input';
import BackButton from '../../components/BackButton';
import VerifyPage from '../VerifyPage';
import Button from '../../components/Button';
import { createAccountFieldsData } from '../../staticData';
// import useFetch from '../../helpers/fetch'

const CreateAccount = (props) => {
  const [createAccountDetails, setCreateAccountDetails] = useState([]);
  const [validateError, setvalidateError] = useState([]);
  const state = useSubContext('loginState')[0];
  const [accountDone, setAccountDone] = useState(false);

  const renderInputs = () => createAccountFieldsData.map(({ id, name, type, placeholder, capitalize }) => {
    if (name === 'confirmPassword') {
      return <Input bg={validateError.confirmPassword} key={id} name={name} type={type} placeholder={placeholder} capitalize={capitalize} onChange={checkPassword} />
    } else if (name === 'lastname') {
      return <Input bg={validateError.lastname} key={id} name={name} type={type} placeholder={placeholder} capitalize={capitalize} onChange={handleInputs} />
    } else if (name === 'firstname') {
      return <Input bg={validateError.firstname} key={id} name={name} type={type} placeholder={placeholder} capitalize={capitalize} onChange={handleInputs} />
    } else if (name === 'ssn') {
      return <Input bg={validateError.ssn} key={id} name={name} type={type} placeholder={placeholder} capitalize={capitalize} onChange={handleInputs} />
    } else if (name === 'username') {
      return <Input bg={validateError.username} key={id} name={name} type={type} placeholder={placeholder} capitalize={capitalize} onChange={handleInputs} />
    } else {
      return <Input key={id} name={name} type={type} placeholder={placeholder} capitalize={capitalize} onChange={handleInputs} />
    }
  });

  const createAccount = async (e) => {
    e.preventDefault()
    if (createAccountDetails.password === createAccountDetails.confirmPassword && createAccountDetails.confirmPassword && createAccountDetails.lastname && createAccountDetails.firstname && createAccountDetails.ssn) {
      await fetch(`${state.apiEndpoint}/api/user`,
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(createAccountDetails)
        })
        .then(res => { console.log(res) })
        .catch(res => { console.log(res) })
      setAccountDone(true);
    } if (!createAccountDetails.ssn) {
      setvalidateError({ ...validateError, ssn: "#f8d7da" })
    } if (!createAccountDetails.confirmPassword || createAccountDetails.confirmPassword !== createAccountDetails.password) {
      setvalidateError({ ...validateError, confirmPassword: "#f8d7da" })
    } if (!createAccountDetails.username) {
      setvalidateError({ ...validateError, username: "#f8d7da" })
    } if (!createAccountDetails.lastname) {
      setvalidateError({ ...validateError, lastname: "#f8d7da" })
    } if (!createAccountDetails.firstname) {
      setvalidateError({ ...validateError, firstname: "#f8d7da" })
    }
  }

  const handleInputs = (e) => {
    setvalidateError({ ...validateError, [e.target.getAttribute('name')]: "#fff" })
    setCreateAccountDetails({ ...createAccountDetails, [e.target.getAttribute('name')]: e.target.value })
  }

  const checkPassword = (e) => {

    setCreateAccountDetails({ ...createAccountDetails, [e.target.getAttribute('name')]: e.target.value })

    if (e.target.value !== createAccountDetails.password) {
      e.target.style.backgroundColor = '#f8d7da'
    } else {
      e.target.style.backgroundColor = '#fff'
    }
  }

  return (
    <div>
      <BackButton back={props} />
      {accountDone ? <VerifyPage props={props} /> : <form>
        {renderInputs()}
        <Button text="Skapa konto" onClick={createAccount} />
      </form>}
    </div>
  )
}

export default CreateAccount;
