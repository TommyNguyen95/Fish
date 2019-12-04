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

const ConfirmPayment = (props) => {

  const [state, dispatch] = useSubContext('transactionState');
  const [validColor, setValidColor] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  /**
   * Function that sends an api call to the backend
   * creating a transaction with the correct message and amount
   * from our state.
   */
  const sendTransaction = async () => {
    const data = {
      amount: state.transactionState.amount,
      message: state.transactionState.message,
      to: state.transactionState.receiverId,
      from: state.loginState._id
    }
    await axios.post(`${state.apiEndpoint}/api/transactions`, data)
    props.props.socket.emit('paymentMessage', data)
  }

  /**
   * Checks validation that the email you sent to exists and
   * also checks for if your usernamer is correct in the verification input
   * after that it sends the transaction to the backend and does a conditional rendering so that 
   * you can see that your transaction is sent.
   */
  const checkValidationForTransaction = () => {
    if (state.transactionState.email.length > 1 && state.loginState.username === state.transactionState.checkEmail) {
      state.loginState.balance = state.loginState.balance - state.transactionState.amount;
      sendTransaction();
      dispatch({ type: 'SET_LOGO', value: false })
      setPaymentConfirmed(true)
    } else {
      setValidColor('#f8d7da');
    }
  }

  return (
    <div>
      {paymentConfirmed ? <ApprovedPage props={props} /> : <StyledConfirm>
        <Text text='Mottagare:' textInput={state.transactionState.email} />
        <Text text='Belopp:' textInput={state.transactionState.amount} />
        <Text text='Meddelande:' textInput={state.transactionState.message} />
        <Input type="password" bg={validColor} onChange={(e) => dispatch({ type: 'TRANSACTION_CHECK', value: e.target.value })} placeholder="Fyll i din epost för att verifiera betalning" />
        <Button onClick={checkValidationForTransaction} text="Skicka betalning" />
        <StyledLink to={'/anvandare'}>
          <Button text="Avbryt betalning" />
        </StyledLink>
      </StyledConfirm>}
    </div>
  )
}

export default ConfirmPayment

