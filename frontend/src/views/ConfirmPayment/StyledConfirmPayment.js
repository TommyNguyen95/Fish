import styled from 'styled-components';
import { Link } from "react-router-dom"

const StyledLink = styled(Link)`
width:100%;
`

const StyledConfirm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  max-width: 400px;
  margin: 0 auto;
  color:#fff;

  * {
    margin: 0.5rem 0;
  }
`;


export {
  StyledConfirm,
  StyledLink
}