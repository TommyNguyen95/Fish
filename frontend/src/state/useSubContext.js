import { useContext } from 'react';
import { FishContext } from '../state/store';

export default (subContext) => {
  const [state, mainDispatch] = useContext(FishContext);
  const dispatch = (obj) => mainDispatch({ ...obj, subContext });
  return [state, dispatch];
}