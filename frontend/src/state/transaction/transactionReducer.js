import { TRANSACTION_AMOUNT, TRANSACTION_MESSAGE } from './transactionActions';

export default (state, action) => {
  switch (action.type) {
    case TRANSACTION_MESSAGE:
      return { ...state, message: action.value };
    case TRANSACTION_AMOUNT:
      return { ...state, amount: action.value }
    default:
      return state;
  }
}