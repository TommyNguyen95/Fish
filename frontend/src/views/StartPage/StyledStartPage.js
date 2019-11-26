import styled from 'styled-components';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

export const HeaderText = styled.h1`
  color: #FDD100;
`
export const LoginForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const LoginButton = styled(Button)`
  color: black !important;
  font-size: 1.6rem;
`
export const TextLinkAccount = styled(Link)`
  color: white;
  align-content: flex-start;
  flex: 1;
  &:hover {
    color: #FDD100;
    cursor: pointer;
    text-decoration: none;
  }
`
export const TextLinkPassword = styled(Link)`
  color: white;
  &:hover {
    color: #FDD100;
    cursor: pointer;
    text-decoration: none;
  }
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 30px;
  max-width: 350px;
`
