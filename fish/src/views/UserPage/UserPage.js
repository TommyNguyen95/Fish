
import React, { useReducer } from 'react';
import {Link} from 'react-router-dom'
import { StyledUserPageContainer, StyledUserBox, StyledUserIconDiv, StyledUserIcon, StyledText } from "./StyledUserPage"
import Logo from "../../components/Logo/Logo"
import Button from '../../components/Button'



const UserPage = () => {
  return (<div>
    <StyledUserIconDiv>
      <StyledText>BALANS: 500 SEK</StyledText>
      <Link to="/profil">
        <StyledUserIcon src="/images/usericon.svg" />
      </Link>
    </StyledUserIconDiv>
    <StyledUserPageContainer>

      <Logo />
      <StyledUserBox>
        <Button text='Betala' fontsize='2rem' />
        <Button text='Betalningshistorik' fontsize="1.3rem" height="60px" /></StyledUserBox>
    </StyledUserPageContainer>
  </div>
  )
}

export default UserPage;