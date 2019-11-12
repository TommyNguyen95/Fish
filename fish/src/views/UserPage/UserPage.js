
import React, { useReducer } from 'react';
import initialState from '../../state/initialState';
import reducer from '../../state/login/loginReducer';
import { StyledUserPageContainer, StyledUserBox,StyledUserIconDiv ,StyledUserIcon , StyledText} from "./StyledUserPage"
import Logo from "../../components/Logo/Logo"
import Button from '../../components/Button'



const UserPage = () => {

  const [state, dispatch] = useReducer(reducer, initialState)




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