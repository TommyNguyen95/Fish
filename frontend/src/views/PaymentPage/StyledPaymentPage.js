import styled from 'styled-components';

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
  StyledForm,
  StyledTextarea,
}