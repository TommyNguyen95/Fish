import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import BackButton from '../../components/BackButton';
import useSubContext from '../../state/useSubContext';
import axios from 'axios';
import {
  StyledTextarea,
  StyledLink
} from './StyledPaymentPage';

const PaymentPage = () => {

  const [state, dispatch] = useSubContext('transactionState');

  const sendTransaction = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: `${state.apiEndpoint}/api/transactions`,
      data: {
        amount: state.transactionState.amount,
        message: state.transactionState.message,
        to: '5dd281f3c447334bd82dbe80',
        from: '5dc02673ca23933504ac3311'
      },
    }).then(response => {
      console.log(response)
    }).catch(response => {
      console.log(response)
    })
  }

  return (
    <div>
      <BackButton to="/anvandare" />
      <form>
        <Input type="text" placeholder="Mottagare" />
        <Input onChange={(e) => dispatch({ type: 'TRANSACTION_AMOUNT', value: e.target.value })} type="number" placeholder="Belopp" />
        <StyledTextarea onChange={(e) => dispatch({ type: 'TRANSACTION_MESSAGE', value: e.target.value })} placeholder="Meddelande" />
        <StyledLink to={'/bekrafta'}>
          <Button onClick={sendTransaction} text="Betala" />
        </StyledLink>
      </form>
    </div>
  );
}

export default PaymentPage;
