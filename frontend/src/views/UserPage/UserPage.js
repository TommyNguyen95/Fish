import React from 'react';
import { StyledUserBox, StyledUserIconDiv, StyledUserIcon, StyledText, StyledButton, StyledLink } from "./StyledUserPage";
import useSubContext from '../../state/useSubContext';

const UserPage = () => {

  const [state, dispatch] = useSubContext('loginState');

  return (
    <div>
      <StyledUserIconDiv>
        <StyledLink to="/profil">
          <StyledText>SALDO: {state.userState.balance}</StyledText>
          <StyledUserIcon src="/images/usericon.svg" />
        </StyledLink>
      </StyledUserIconDiv>
      <StyledUserBox>
        <StyledLink to={'/betala'}> <StyledButton text='Betala' /></StyledLink>
        {state.userState.role === 'admin' ? <StyledLink to={'/transaktioner'}> <StyledButton text='Alla transaktioner' /></StyledLink> : ''}
        <StyledButton text='Betalningshistorik' fontsize="1.3rem" /></StyledUserBox>
    </div>

  )
}

export default UserPage;