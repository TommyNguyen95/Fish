import { NAME_UPDATE, PASSWORD_UPDATE } from '../state/login/loginActions';
import initialState from './initialState';

export default (state = initialState.fish, action) => {
  console.log(state)
  switch (action.type) {
    case NAME_UPDATE:
      return { ...state, username: action.value};
    case PASSWORD_UPDATE:
      return { ...state, password: action.value}
    default:
      return state;
  }
};