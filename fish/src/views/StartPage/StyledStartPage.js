import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';


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