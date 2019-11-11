import initialState from '../initialState';
import { NAME_UPDATE, PASSWORD_UPDATE } from './loginActions';

export default (state, action) => {
  console.log(state, 'vad är det nu?')
  switch (action.type) {
    case NAME_UPDATE:
      return {  ...state, name: action.value };
    default:
      return state;
  }
};