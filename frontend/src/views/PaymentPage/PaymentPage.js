import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import BackButton from '../../components/BackButton';
import useSubContext from '../../state/useSubContext';
import ConfirmPayment from '../ConfirmPayment';
import {
  StyledTextarea,
  StyledLink
} from './StyledPaymentPage';

const PaymentPage = (props) => {

  const [state, dispatch] = useSubContext('transactionState');
  const [transactionInfo, setTransactionInfo] = useState(false);

  const getInfoForTransaction = (e) => {
    e.preventDefault();
    setTransactionInfo(true)
  }

  return (
    <div>
      <BackButton to="/anvandare" />
      {transactionInfo ? <ConfirmPayment /> : <form>
        <Input onChange={(e) => dispatch({ type: 'TRANSACTION_EMAIL', value: e.target.value })} type="text" placeholder="Mottagarens Email" />
        <Input onChange={(e) => dispatch({ type: 'TRANSACTION_AMOUNT', value: e.target.value })} type="number" placeholder="Belopp" />
        <StyledTextarea onChange={(e) => dispatch({ type: 'TRANSACTION_MESSAGE', value: e.target.value })} placeholder="Meddelande" />
        <Button onClick={getInfoForTransaction} text="Betala" />
      </form>}
    </div>
  );
}

export default PaymentPage;
