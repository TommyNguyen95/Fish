import React from 'react';
import { Link } from 'react-router-dom'
import { StyledUserBox, StyledUserIconDiv, StyledUserIcon, StyledText, StyledButton, StyledLink } from "./StyledUserPage"


const UserPage = () => {



  return (
    <div>
      <StyledUserIconDiv>
        <StyledText>BALANS: 500 SEK</StyledText>
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