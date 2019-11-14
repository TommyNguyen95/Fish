import React from 'react';
import { StyledUserBox, StyledUserIconDiv, StyledUserIcon, StyledText, StyledButton } from "./StyledUserPage"


const UserPage = () => {



  return (
    <div>
      <StyledUserIconDiv>
        <StyledText>BALANS: 500 SEK</StyledText>
        <StyledUserIcon src="/images/usericon.svg" />
      </StyledUserIconDiv>
      <StyledUserBox>
        <StyledButton text='Betala' />
        <StyledButton text='Betalningshistorik' fontsize="1.3rem" /></StyledUserBox>
    </div>

  )
}

export default UserPage;