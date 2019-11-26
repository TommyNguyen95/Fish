import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import BackButton from '../../components/BackButton';
import useSubContext from '../../state/useSubContext';
import ConfirmPayment from '../ConfirmPayment';
import {
  StyledTextarea,
} from './StyledPaymentPage';
import axios from 'axios';

const PaymentPage = (props) => {

  const [state, dispatch] = useSubContext('transactionState');
  const [transactionInfo, setTransactionInfo] = useState(false);
  const [validColor, setValidColor] = useState('');
  const [validMoney, setValidMoney] = useState('');

  /**
   * This function gets information for the transaction.
   * First it checks if there is enough balance on the persons account who tries to
   * send a transaction to someone. After that it checks if the person you are sending money to by getfish
   * exist, if it does it will send you to the confirmation page, if not it will set the background color of the
   * input fields to red so the user knows that something is not correct.
   */
  const getInfoForTransaction = (e) => {
    e.preventDefault();
    if (state.loginState.balance >= state.transactionState.amount) {
      if (state.loginState.username !== state.transactionState.email) {
        axios.get(`${state.apiEndpoint}/api/user/${state.transactionState.email}`)
          .then(response => {
            state.transactionState.receiverId = response.data._id
            state.transactionState.recieverBalance = response.data.balance;
            setTransactionInfo(true)
          }).catch(response => {
            alert('Error, var vänlig att kontakta support om detta fortsätter.')
          })
      }
    } else {
      setValidMoney('#f8d7da')

    }
    if (transactionInfo === false) {
      setValidColor('#f8d7da')
    }
    if (validMoney === '#f8d7da') {
      setValidColor('')
    }
  }

  return (
    <div>
      <BackButton props={props} to="/anvandare" />
      {transactionInfo ? <ConfirmPayment props={props} /> : <form>
        <Input bg={validColor} onChange={(e) => dispatch({ type: 'TRANSACTION_EMAIL', value: e.target.value })} type="text" placeholder="Mottagarens Email" />
        <Input bg={validMoney} onChange={(e) => dispatch({ type: 'TRANSACTION_AMOUNT', value: parseInt(e.target.value) })} type="number" placeholder="Belopp" />
        <StyledTextarea onChange={(e) => dispatch({ type: 'TRANSACTION_MESSAGE', value: e.target.value })} placeholder="Meddelande" />
        <Button onClick={getInfoForTransaction} text="Betala" />
      </form>}
    </div>
  );
}

export default PaymentPage;
