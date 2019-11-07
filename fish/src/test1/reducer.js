import initialState from "./initialState";
import { NAME_UPDATE, TOMMY_UPDATE } from './action';

export default (state = initialState, action) => {
  switch (action.type) {
    case NAME_UPDATE:
      return {
        ...state, 
        name: action.fest
      };
    case TOMMY_UPDATE:
      return {
        ...state,
        tommy: action.value
      };
    default:
      return state;
  }
};
