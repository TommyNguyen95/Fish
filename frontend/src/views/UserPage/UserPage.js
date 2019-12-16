import React, { useEffect } from 'react';
import { StyledUserBox, StyledUserIconDiv, StyledUserIcon, StyledText, StyledButton, StyledLink } from "./StyledUserPage";
import useSubContext from '../../state/useSubContext';
import useSocket from '../../helpers/useSocket';
import Axios from 'axios';

const UserPage = ({ socket, setSocket }) => {
  useSocket(socket, setSocket);
  const dispatch = useSubContext('loginState')[1];
  const tmpstate = useSubContext('loginState')[0];

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get(`/api/login`).then(res => {
        dispatch({ type: "RESET_STATE", value: res.data })
      })
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let balance = tmpstate.loginState.balance;

  return (
    <div>
      <StyledUserIconDiv>
        <StyledLink to="/profil">
          <StyledText>SALDO: {balance.toLocaleString() + ' SEK'}</StyledText>
          <StyledUserIcon src="/images/usericon.svg" />
        </StyledLink>
      </StyledUserIconDiv>
      <StyledUserBox>
        <StyledLink to={'/betala'}> <StyledButton text='Betala' /></StyledLink>
        {tmpstate.loginState.role === 'admin' ? <StyledLink to={'/transaktioner'}> <StyledButton text='Sök användare' /></StyledLink> : ''}
        <StyledLink to={'/historik'}> <StyledButton text='Betalningshistorik' fontsize="1.3rem" /></StyledLink>
      </StyledUserBox>
    </div>

  )
}

export default UserPage;