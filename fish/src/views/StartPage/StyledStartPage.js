import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';


export const StartPageContainer = styled(Container)`
  background-color: #0058a3;
  width: 100vw;
  height: 100vh;

`

export const LogoRow = styled(Row)`
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

export const LogoCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LogoImage = styled.img`
  width: 200px;
  padding: 10px;
`
export const HeaderText = styled.h1`
  font-size: 16px;
  color: white;
  @import url('https://fonts.googleapis.com/css?family=Josefin+Sans:400,400i,700,700i&display=swap');
  font-family: 'Josefin Sans', sans-serif;
  margin-bottom: 40px;
`

export const LoginRow = styled(Row)`

`

export const LoginCol = styled(Col)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
export const LoginForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const LoginButton = styled(Button)`
  max-width: 300px;
  text-transform: uppercase;
  @media (max-width: 576px){
    width: 100%;
  }
`
export const TextLink = styled(Link)`
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 13px;
  font-family: 'Josefin Sans',sans-serif;
  flex: 1;
  margin-left: 12px;
`
export const TextWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  width: 30%;
  display: flex;
  justify-content: space-between;
  max-width: 300px;

  @media (max-width: 576px){
    width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1199.98px){
    width: 40%;
  }
`
