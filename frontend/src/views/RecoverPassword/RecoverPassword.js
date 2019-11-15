import React from 'react';
import { Row, Col } from 'reactstrap';
import {
  RecoverForm,
  RecoverButton
} from './StyledRecoverPassword';
import Input from '../../components/Input/Input';

const sendNewPassword = (e) => {
  e.preventDefault()
  console.log('test')
}

const RecoverPassword = () => {
  return (
    <Row>
      <Col xs="12" md="12" lg="12">
        <RecoverForm>
          <Input placeholder="Användarnamn" />
          <RecoverButton onClick={sendNewPassword} text="Återställ lösenord"></RecoverButton>
        </RecoverForm>
      </Col>
    </Row>
  )
}

export default RecoverPassword;