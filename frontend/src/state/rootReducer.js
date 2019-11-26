import initialState from './initialState';
import loginReducer from './login/loginReducer';
import transactionReducer from './transaction/transactionReducer';

/**
 * Vår reducermap för rootReducern här lägger ni ert state och er reducer till det statet.
 */
let reducerMap = {
  loginState: loginReducer,
  transactionState: transactionReducer
};

export default (state = initialState, action) => {
  let { subContext } = action;
  delete action.subContext;
  let subState = state[subContext];
  let newState = { ...state };
  newState[subContext] = reducerMap[subContext](subState, action);
  return newState;
};