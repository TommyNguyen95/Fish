import styled from 'styled-components';

const StyledContainer = styled.div`
  background-color: #0058A3;
  min-height: 100vh;
  min-width: 100vw;
`;

const StyledLogo = styled.img`
  margin-top: 5rem !important;
  width: 200px;
  padding: 15px;
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
  StyledContainer,
  StyledLogo,
  StyledForm,
  StyledTextarea,
}