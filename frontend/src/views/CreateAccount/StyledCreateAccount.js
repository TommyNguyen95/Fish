import styled from 'styled-components';
import { ArrowLeft } from 'react-feather';

const StyledContainer = styled.div`
`;


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 400px;
  margin: 0 auto;
  * {
    margin: 0.5rem 0;
  }
`;

const StyledInput = styled.input`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.1rem;
  min-width: 100%;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 3px;
  text-transform: ${({ capitalize }) => capitalize ? 'capitalize' : 'none'};
`;

const StyledButton = styled.button`
  background-color: #FDD100;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.6rem;
  min-width: 100%;
  border: none;
  padding: 1rem 0;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    background-color: #ffe152;
  }
  &:active {
    opacity: 0.9;
  }
`;

const StyledBackArrow = styled(ArrowLeft)`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

export {
  StyledContainer,
  StyledForm,
  StyledInput,
  StyledButton,
  StyledBackArrow
}