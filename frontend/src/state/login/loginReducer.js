import { NAME_UPDATE, PASSWORD_UPDATE } from './loginActions';

export default (state, action) => {
  switch (action.type) {
    case NAME_UPDATE:
      return { ...state, username: action.value };
    case PASSWORD_UPDATE:
      return { ...state, password: action.value }
    default:
      return state;
  }
}