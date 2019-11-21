import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useSubContext from '../../state/useSubContext';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import {
  TextLinkAccount,
  TextLinkPassword,
  LoginForm,
  LoginButton,
  TextWrapper
} from './StyledStartPage';
import Input from '../../components/Input/Input';

const Startpage = props => {

  /**
   * Getting our state and dispatch and also pointing to what state we want to update.
   * Which in this case would be our loginState.
   */
  const [state, dispatch] = useSubContext('loginState');
  const [validColor, setValidColor] = useState('');
  /**
   * Function that makes a post to the backend to both login the user
   * and check if the user is valid.
   */
  const loginRequest = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: `${state.apiEndpoint}/api/login`,
      data: {
        username: state.loginState.username,
        password: state.loginState.password,
      }
    }).then(response => {
      state.loginState.isLoggedIn = true;
      state.loginState.firstname = response.data.firstname;
      state.loginState.lastname = response.data.lastname;
      state.loginState.relations = response.data.relations;
      state.loginState.role = response.data.role;
      state.loginState.balance = response.data.balance;
      props.history.push('/anvandare')

    }).catch(response => {
      setValidColor('#f8d7da');
    })
  }

  return (
    <Row>
      {state.loginState._id && <Redirect to="/anvandare" />}
      <Col xs="12" md="12" lg="12">
        <LoginForm>
          <Input bg={validColor} placeholder="Användarnamn" onChange={(e) => dispatch({ type: "NAME_UPDATE", value: e.target.value })} />
          <Input bg={validColor} type="password" placeholder="Lösenord" id="Popover1" onChange={(e) => dispatch({ type: "PASSWORD_UPDATE", value: e.target.value })} />
          <LoginButton onClick={loginRequest} text="Logga In" width="50%" height="30px" fontsize="14px"></LoginButton>
          <TextWrapper>
            <TextLinkAccount to={"skapa-konto"}>Skapa konto</TextLinkAccount>
            <TextLinkPassword to={"/"}>Glömt lösenord</TextLinkPassword>
          </TextWrapper>
        </LoginForm>
      </Col>
    </Row>
  )
}

export default Startpage;