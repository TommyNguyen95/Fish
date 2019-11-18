import React from 'react';
import { Link } from 'react-router-dom'
import { StyledUserBox, StyledUserIconDiv, StyledUserIcon, StyledText, StyledButton, StyledLink } from "./StyledUserPage"


const UserPage = () => {



  return (
        <Link to="/profil">
        </Link>
    <div>
      <StyledUserIconDiv>
        <StyledText>BALANS: 500 SEK</StyledText>
        <StyledUserIcon src="/images/usericon.svg" />
      </StyledUserIconDiv>
      <StyledUserBox>
        <StyledLink to={'/betala'}> <StyledButton text='Betala' /></StyledLink>
        <StyledButton text='Betalningshistorik' fontsize="1.3rem" /></StyledUserBox>
    </div>

  )
}

export default UserPage;