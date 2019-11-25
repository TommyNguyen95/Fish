import { NAME_UPDATE, PASSWORD_UPDATE, RESET_STATE } from './loginActions';

export default (state, action) => {
  switch (action.type) {
    case NAME_UPDATE:
      return { ...state, username: action.value };
    case PASSWORD_UPDATE:
      return { ...state, password: action.value }
    case RESET_STATE:
      return { ...action.value }
    default:
      return state;
  }
}