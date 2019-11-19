import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import {
  RecoverForm,
  RecoverButton
} from './StyledRecoverPassword';
import Input from '../../components/Input/Input';

const RecoverPassword = () => {

  const [emial, setEmail] = useState([]);

  const sendNewPassword = (e) => {
    e.preventDefault()
    console.log(emial.email)
  }

  const getEmail = (e) => {
    setEmail({ ...emial, [e.target.getAttribute('name')]: e.target.value })
  }

  return (
    <Row>
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