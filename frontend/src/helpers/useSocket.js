import { useEffect } from 'react';
import socketIo from 'socket.io-client';
import useSubContext from '../state/useSubContext';

export default (socket, setSocket) => {
  const state = useSubContext('loginState')[0];
  useEffect(() => {
    if (!socket) {
      const newSocket = socketIo('http://localhost:3001');
      newSocket.emit('initialMessage', state.loginState.username)
      // On paymentMessage is going to receive the data that we want
      // To display to the user when it receives a payment
      newSocket.on('paymentMessage', (msg) => console.log(msg))
      setSocket(newSocket)
    }
    /* eslint-disable-next-line */
  }, [])
}