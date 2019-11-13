import React from 'react';
import useSubContext from '../../state/useSubContext';
import {
  StartPageContainer,
  LogoRow,
  LogoCol,
  LogoImage,
  HeaderText,
  LoginRow,
  LoginCol,
  LoginForm,
  LoginButton,
  TextLink,
  TextWrapper
} from './StyledStartPage';
import Input from '../../components/Input/Input';

const Startpage = () => {

  const [state, dispatch] = useSubContext('loginState');

  console.log(state)
  return (
    <StartPageContainer>
      <LogoRow>
        <LogoCol xs="12" md="12" lg="12">
          <LogoImage src="/images/fishlogo.svg"></LogoImage>
        </LogoCol>
      </LogoRow>
      <LoginRow>
        <LoginCol xs="12" md="12" lg="12">
          <HeaderText>När du vill skicka en lax eller två</HeaderText>
          <LoginForm>
            <Input placeholder="Användarnamn" onChange={(e) => dispatch({ type: "NAME_UPDATE", value: e.target.value })} />
            <Input type="password" placeholder="Lösenord" onChange={(e) => dispatch({ type: "PASSWORD_UPDATE", value: e.target.value })} />
            <LoginButton text="Logga In" width="50%" height="30px" fontsize="14px"></LoginButton>
            <TextWrapper>
              <TextLink to={"skapa-konto"}>Skapa konto</TextLink>
              <TextLink to={"/"}>Glömt lösenord</TextLink>
            </TextWrapper>
          </LoginForm>
        </LoginCol>
      </LoginRow>
    </StartPageContainer>
  )
}

export default Startpage;