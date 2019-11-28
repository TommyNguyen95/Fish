import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useSubContext from '../../state/useSubContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col } from 'reactstrap';
import {
  TextLinkAccount,
  TextLinkPassword,
  LoginForm,
  LoginButton,
  TextWrapper,
} from './StyledStartPage';
import Input from '../../components/Input/Input';
import './toastify.scss';

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
      state.loginState.active = response.data.active;
      state.loginState.firstname = response.data.firstname;
      state.loginState.lastname = response.data.lastname;
      state.loginState.relations = response.data.relations;
      state.loginState.role = response.data.role;
      state.loginState.balance = response.data.balance;
      state.loginState.transactions = response.data.transactions;
      dispatch({ type: "RESET_STATE", value: state.loginState })

      if (response.data.active) {
        props.history.push('/anvandare')
      } else {
        toast('Ditt konto är inte aktiverat eller har nyligen blivit avaktiverat, om detta uppstår så kontakta vår support. Mvh getfish.se')
      }

    }).catch(response => {
      setValidColor('#f8d7da');
    })
  }

  return (
    <Row>
      {state.loginState._id && <Redirect to="/anvandare" />}
      <Col xs="12" md="12" lg="12">
        <LoginForm>
          <ToastContainer autoClose={10000} position={toast.POSITION.TOP_CENTER} />
          <Input bg={validColor} placeholder="E-post" onChange={(e) => dispatch({ type: "NAME_UPDATE", value: e.target.value })} />
          <Input bg={validColor} type="password" placeholder="Lösenord" id="Popover1" onChange={(e) => dispatch({ type: "PASSWORD_UPDATE", value: e.target.value })} />
          <LoginButton onClick={loginRequest} text="Logga In" fontsize="14px"></LoginButton>
          <TextWrapper>
            <TextLinkAccount to={"skapa-konto"}>Skapa konto</TextLinkAccount>
            <TextLinkPassword to={"/aterstallning"}>Glömt lösenord</TextLinkPassword>
          </TextWrapper>
        </LoginForm>
      </Col>
    </Row>
  )
}

export default Startpage;