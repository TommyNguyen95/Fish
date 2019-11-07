import React, {useReducer} from 'react';
import {
  StartPageContainer,
  LogoRow,
  LogoCol,
  LogoImage,
  HeaderText,
  LoginRow,
  LoginCol
} from './StyledStartPage';
import Input from '../../components/Input';
import initialState from '../../state/initialState';
import reducer from '../../state/login/loginReducer';

const Startpage = () => {

  const [state, dispatch ] = useReducer(reducer, initialState)

  const simon = () => {
    console.log(state.fish.loginState.name)
    console.log(state)
  }

  return (
    <StartPageContainer>
      <LogoRow>
        <LogoCol xs="12" md="12" lg="12">
          <LogoImage onClick={simon} src="/images/fishlogo.svg"></LogoImage>
        </LogoCol>
      </LogoRow>
      <LoginRow>
        <LoginCol xs="12" md="12" lg="12">
        <HeaderText>När du vill skicka en lax eller två</HeaderText>
          <Input onChange={(e) => dispatch({type: "NAME_UPDATE", value: e.target.value})} />
          <Input onChange={(e) => dispatch({type: "PASSWORD_UPDATE", value: e.target.value})} />
        </LoginCol>
      </LoginRow>
    </StartPageContainer>
  )
}

export default Startpage;