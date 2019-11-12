import React, { useContext } from 'react';
import {
  StartPageContainer,
  LogoRow,
  LogoCol,
  LogoImage,
  HeaderText,
  LoginRow,
  LoginCol,
  LoginForm
} from './StyledStartPage';
import { FishContext } from '../../state/store';
import Input from '../../components/Input/Input';


const Startpage = () => {

  const [state, dispatch] = useContext(FishContext)

  const della = () => {
    console.log(state)
  }

  return (
    <StartPageContainer>
      <LogoRow>
        <LogoCol xs="12" md="12" lg="12">
          <LogoImage onClick={della} src="/images/fishlogo.svg"></LogoImage>
        </LogoCol>
      </LogoRow>
      <LoginRow>
        <LoginCol xs="12" md="12" lg="12">
          <HeaderText>När du vill skicka en lax eller två</HeaderText>
          <LoginForm>
            <Input onChange={(e) => dispatch({ type: "NAME_UPDATE", value: e.target.value })} />
            <Input type="password" onChange={(e) => dispatch({ type: "PASSWORD_UPDATE", value: e.target.value })} />
          </LoginForm>
        </LoginCol>
      </LoginRow>
    </StartPageContainer>
  )
}

export default Startpage;