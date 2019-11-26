import styled from 'styled-components';
import { Link } from "react-router-dom"

const StyledLink = styled(Link)`
width:100%;
`

const StyledTextarea = styled.textarea`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.1rem;
  min-width: 100%;
  min-height: 7rem;
  border: none;
  padding: 0.75rem 1rem;  
  border-radius: 3px;
`;

export {
  StyledTextarea,
  StyledLink
}