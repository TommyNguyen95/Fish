import React from 'react';
import { StyledUserBox, StyledUserIconDiv, StyledUserIcon, StyledText, StyledButton, StyledLink } from "./StyledUserPage";
import useSubContext from '../../state/useSubContext';


const UserPage = () => {

  const [state, dispatch] = useSubContext('loginState');

  return (
    <div>
      <StyledUserIconDiv>
        <StyledText>SALDO: {state.userState.balance}</StyledText>
        <StyledUserIcon src="/images/usericon.svg" />
      </StyledUserIconDiv>
      <StyledUserBox>
        <StyledLink to={'/betala'}> <StyledButton text='Betala' /></StyledLink>
        <StyledButton text='Betalningshistorik' fontsize="1.3rem" /></StyledUserBox>
    </div>

  )
}

export default UserPage;