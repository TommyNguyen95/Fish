import {Container} from 'reactstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  background-color: #0058A3;
  min-height: 100vh;
  min-width: 100vw;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
`;

const StyledVerifyMessage = styled.div`
  border-radius:9px;
  margin-top:70px;
  background-color:none;
  width:90%;
  height:300px;
  display:flex;
  justify-content:space-around;
  align-items:center;
  flex-direction:column;
`;

export {
  StyledContainer,
  StyledVerifyMessage
}