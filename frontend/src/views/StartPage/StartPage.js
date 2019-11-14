import React from 'react';
import useSubContext from '../../state/useSubContext';
import { Row, Col } from 'reactstrap';
import {
  TextLinkAccount,
  TextLinkPassword,
  LoginForm,
  LoginButton,
  TextWrapper
} from './StyledStartPage';
import Input from '../../components/Input/Input';

const Startpage = () => {

  /**
   * Getting our state and dispatch and also pointing to what state we want to update.
   * Which in this case would be our loginState.
   */
  const [state, dispatch] = useSubContext('loginState');

  return (
    <Row>
      <Col xs="12" md="12" lg="12">
        <LoginForm>
          <Input placeholder="Användarnamn" onChange={(e) => dispatch({ type: "NAME_UPDATE", value: e.target.value })} />
          <Input type="password" placeholder="Lösenord" onChange={(e) => dispatch({ type: "PASSWORD_UPDATE", value: e.target.value })} />
          <LoginButton text="Logga In" width="50%" height="30px" fontsize="14px"></LoginButton>
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