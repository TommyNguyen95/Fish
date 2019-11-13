import React from 'react';
import { StyledUserPageContainer, StyledUserBox,StyledUserIconDiv ,StyledUserIcon , StyledText} from "./StyledUserPage"
import Logo from "../../components/Logo/Logo"
import Button from '../../components/Button'



const UserPage = () => {



  return (<div>
        <StyledUserIconDiv>
       <StyledText>BALANS: 500 SEK</StyledText>
      <StyledUserIcon src="/images/usericon.svg"/>
      </StyledUserIconDiv>
    <StyledUserPageContainer>

      <Logo />
      <StyledUserBox>
        <Button text='Betala' fontsize='2rem'/>
        <Button text='Betalningshistorik' fontsize="1.3rem" height="60px"/></StyledUserBox>
    </StyledUserPageContainer>
    </div>
  )
}

export default UserPage;