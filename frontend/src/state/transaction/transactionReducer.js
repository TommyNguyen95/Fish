import {
  TRANSACTION_AMOUNT,
  TRANSACTION_MESSAGE,
  TRANSACTION_EMAIL,
  TRANSACTION_PASSWORDCHECK,
} from './transactionActions';

export default (state, action) => {
  switch (action.type) {
    case TRANSACTION_MESSAGE:
      return { ...state, message: action.value };
    case TRANSACTION_AMOUNT:
      return { ...state, amount: action.value };
    case TRANSACTION_EMAIL:
      return { ...state, email: action.value };
    case TRANSACTION_PASSWORDCHECK:
      return { ...state, checkPassword: action.value }
    default:
      return state;
  }
}