import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import {
  RecoverForm,
  RecoverButton
} from './StyledRecoverPassword';
import BackButton from '../../components/BackButton';
import Input from '../../components/Input/Input';
import axios from 'axios';
import './recoverstyle.scss'
import { TextLinkAccount } from '../StartPage/StyledStartPage'


const RecoverPassword = (props) => {

  const [email, setEmail] = useState([]);
  const [emailSent, setEmailSent] = useState(false);
  const [emailString, setEmailString] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [userFind, setUserFind] = useState(false);

  const sendNewPassword = (e) => {
    e.preventDefault()
    axios.post(`/api/sendresetlink/${email.email}`).then(response => {
      if (response.data.result) {
        setEmailString(response.data.string)
        setEmailSent(true)
        setUserFind(response.data.result)
        setShowLink(response.data.link)
        setTimeout(function () { window.location.replace('/') }, 6000);
      } else {
        setEmailSent(true)
        setUserFind(response.data.result)
        setShowLink(response.data.link)
        setEmailString(response.data.string)
        setTimeout(function () { window.location.replace('/') }, 6000);
      }
    })


  }

  const getEmail = (e) => {
    setEmail({ ...email, [e.target.getAttribute('name')]: e.target.value })
  }

  return (
    <Row>
      <BackButton back={props} />
      {emailSent ? (<Col xs="12" md="12" lg="12">
        <RecoverForm>
          {userFind ? (<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>) : ''}
          <h5 className="reset-text">{emailString} </h5>
          <p className="redirect-text">Du skickas nu tillbaka till startsidan!</p>
          <TextLinkAccount to={'/'}>{showLink}</TextLinkAccount>
        </RecoverForm>
      </Col>) : (<Col xs="12" md="12" lg="12">
        <RecoverForm>
          <Input name="email" onChange={getEmail} placeholder="E-post" />
          <RecoverButton onClick={sendNewPassword} width="50%" height="30px" text="Återställ lösenord"></RecoverButton>
        </RecoverForm>
      </Col>)}

    </Row>
  )
}

export default RecoverPassword;