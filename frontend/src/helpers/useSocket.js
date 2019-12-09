import { useEffect } from 'react';
import socketIo from 'socket.io-client';
import useSubContext from '../state/useSubContext';
import { toast } from 'react-toastify';

export default (socket, setSocket) => {
  const state = useSubContext('loginState')[0];
  useEffect(() => {
    if (!socket) {
      const newSocket = socketIo('http://localhost:3001');
      setSocket(newSocket)
      newSocket.emit('initialMessage', state.loginState.username)
      newSocket.on('paymentMessage', ({ from }) => toast(`
        Betalning från ${from} mottagen
      `))
    }
    /* eslint-disable-next-line */
  }, [])
}