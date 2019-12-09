import React from 'react';
import { StyledUserBox, StyledUserIconDiv, StyledUserIcon, StyledText, StyledButton, StyledLink } from "./StyledUserPage";
import useSubContext from '../../state/useSubContext';
import useSocket from '../../helpers/useSocket';

const UserPage = ({ socket, setSocket }) => {
  useSocket(socket, setSocket);
  const state = useSubContext('loginState')[0];
  console.log(state);

  let balance = state.loginState.balance;


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
        {state.loginState.role === 'admin' ? <StyledLink to={'/transaktioner'}> <StyledButton text='Sök användare' /></StyledLink> : ''}
        <StyledLink to={'/historik'}> <StyledButton text='Betalningshistorik' fontsize="1.3rem" /></StyledLink>
      </StyledUserBox>
    </div>

  )
}

export default UserPage;