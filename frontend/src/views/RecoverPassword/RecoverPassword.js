import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import {
  RecoverForm,
  RecoverButton
} from './StyledRecoverPassword';
import BackButton from '../../components/BackButton';
import Input from '../../components/Input/Input';
import useSubContext from '../../state/useSubContext';
import axios from 'axios';

const RecoverPassword = (props) => {

  const [email, setEmail] = useState([]);
  const [state, dispatch] = useSubContext('loginState');

  const sendNewPassword = (e) => {
    e.preventDefault()
    axios.post(`${state.apiEndpoint}/api/sendresetlink/${email.email}`)
    console.log(email.email)
  }

  const getEmail = (e) => {
    setEmail({ ...email, [e.target.getAttribute('name')]: e.target.value })
  }

  return (
    <Row>
      <BackButton back={props} />
      <Col xs="12" md="12" lg="12">
        <RecoverForm>
          <Input name="email" onChange={getEmail} placeholder="E-post" />
          <RecoverButton onClick={sendNewPassword} width="50%" height="30px" text="Återställ lösenord"></RecoverButton>
        </RecoverForm>
      </Col>
    </Row>
  )
}

export default RecoverPassword;