import React, { createContext, useReducer } from 'react';
import initialState from '../state/initialState';
import rootReducer from './rootReducer';


export const FishContext = createContext({});

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <FishContext.Provider value={[state, dispatch]}>
      {children}
    </FishContext.Provider>
  )
}

export default Store;
