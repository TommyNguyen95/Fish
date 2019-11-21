import React, { useState } from 'react';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useSubContext from '../../state/useSubContext';
import ApprovedPage from '../ApprovedPage';
import axios from 'axios';
import {
  StyledConfirm,
  StyledLink
} from './StyledConfirmPayment';

const ConfirmPayment = () => {

  const [state, dispatch] = useSubContext('transactionState');
  const [validColor, setValidColor] = useState('');
  const [ApprovedPayment, setApprovedPayment] = useState(false);


  const sendTransaction = (e) => {
    e.preventDefault();
    axios.post(`${state.apiEndpoint}/api/transactions`, {
      amount: state.transactionState.amount,
      message: state.transactionState.message,
      to: '5dd281f3c447334bd82dbe80',
      from: '5dc02673ca23933504ac3311'
    }).then(response => {
      console.log(response)
    }).catch(response => {
      console.log(response)
    })
  }

  const checkValidationForTransaction = () => {
    if (state.loginState.password === state.transactionState.checkPassword) {
      alert('KIM HAD HIS FIRST REAL SEX DREAM, AT THE CLASSPARTY IN 69')
    } else {
      setValidColor('#f8d7da');
    }
    setApprovedPayment(true)
  }

  return (
    <div>
      {ApprovedPayment ? <ApprovedPage /> :
        <StyledConfirm>
          <Text text='Mottagare:' textInput={state.transactionState.email} />
          <Text text='Belopp:' textInput={state.transactionState.amount} />
          <Text text='Meddelande:' textInput={state.transactionState.message} />
          <Input type="password" bg={validColor} onChange={(e) => dispatch({ type: 'TRANSACTION_PASSWORDCHECK', value: e.target.value })} placeholder="Fyll i ditt lösenord för att verifiera betalning" />
          <Button onClick={checkValidationForTransaction} text="Skicka betalning" />
          <StyledLink to={'/betala'}>
            <Button text="Avbryt betalning" />
          </StyledLink>
        </StyledConfirm>
      }
    </div>
  )
}

export default ConfirmPayment

