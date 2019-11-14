import styled from 'styled-components';

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

export {
  StyledContainer,
  StyledForm,
}