import React from 'react';
import { StyledUserBox, StyledUserIconDiv, StyledUserIcon, StyledText, StyledButton, StyledLink } from "./StyledUserPage";
import useSubContext from '../../state/useSubContext';
import { Link } from 'react-router-dom';


const UserPage = () => {

  const [state, dispatch] = useSubContext('loginState');

  return (
    <div>
      <StyledUserIconDiv>
        <StyledText>SALDO: {state.userState.balance}</StyledText>
        <Link to="/profil">
          <StyledUserIcon src="/images/usericon.svg" />
        </Link>
      </StyledUserIconDiv>
      <StyledUserBox>
        <StyledLink to={'/betala'}> <StyledButton text='Betala' /></StyledLink>
        <StyledButton text='Betalningshistorik' fontsize="1.3rem" /></StyledUserBox>
    </div>

  )
}

export default UserPage;