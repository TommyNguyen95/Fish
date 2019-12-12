import { useEffect } from 'react';
import socketIo from 'socket.io-client';
import useSubContext from '../state/useSubContext';
import { toast } from 'react-toastify';

export default (socket, setSocket) => {
  const [state, dispatch] = useSubContext('loginState');
  useEffect(() => {
    if (!socket) {
      const newSocket = socketIo('http://localhost:3001');
      setSocket(newSocket)
      newSocket.emit('initialMessage', state.loginState.username)
      newSocket.on('paymentMessage', ({ from, amount }) => {
        toast(`Betalning från ${from} mottagen`)
        state.loginState.balance += amount;
        dispatch({ type: "RESET_STATE", value: state.loginState })
        console.log(state)
      }
      )
    }
    /* eslint-disable-next-line */
  }, [])
}