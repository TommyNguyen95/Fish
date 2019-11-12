import React, {useContext} from 'react';
import { FishContext } from '../../state/store';

const Test = () => { 

  const [state] = useContext(FishContext);

  return(
    <div>
      <h1>Detta är username: {state.username}</h1>
      <h1>Detta är password: {state.password} </h1>
    </div>
  )
}

export default Test;
