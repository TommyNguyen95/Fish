import { useEffect } from 'react';
import socketIo from 'socket.io-client';
import useSubContext from '../state/useSubContext';
import { toast } from 'react-toastify';


export default (socket, setSocket) => {
  const [state, dispatch] = useSubContext('loginState');
  useEffect(() => {
    if (!socket) {
      const newSocket = socketIo('localhost:3001');
      setSocket(newSocket)
      newSocket.emit('initialMessage', state.loginState.username)
      newSocket.on('paymentMessage', ({ from, amount }) => {
        toast(`${amount} SEK mottaget från ${from}`)
        state.loginState.balance += amount;
        dispatch({ type: "RESET_STATE", value: state.loginState })
      }
      )
    }
    /* eslint-disable-next-line */
  }, [])
}