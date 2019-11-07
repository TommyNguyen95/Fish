import React, { useReducer } from 'react';
import reducer from './test1/reducer';
import initialState from './test1/initialState';

import './App.css';

function App() {

  const [ state, dispatch ] = useReducer(reducer, initialState);
  console.log(state, 'ursprungliga statet!')

  const theBiceps = (e) => {
    dispatch({ type: "NAME_UPDATE", fest: e.target.value})
    console.log(state)
  };

  const whatIsTommy = e => {
    dispatch({ type: "TOMMY_UPDATE", value: e.target.value})
    console.log(state)
  }

  

  return (
    <div className="App">
      <h1>SÅ HÄR FUNKAR DET TILL EXEMPEL PÅ EN INPUT</h1>
      <p>Input 1</p>
      <input onChange={theBiceps}></input>
      <p>Input 2</p>
      <input onChange={whatIsTommy}></input>
    </div>
  );
}

export default App;
