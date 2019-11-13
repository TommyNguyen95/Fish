import styled from 'styled-components';

export const StyledInput = styled.input`
  height: 30px;
  @import url('https://fonts.googleapis.com/css?family=Josefin+Sans:400,400i,700,700i&display=swap');
  font-family: 'Josefin Sans', sans-serif;
  width: 50%;
  border-radius: 3px;
  border: none;
  margin-bottom: 10px;
  max-width: 300px;

  @media (max-width: 576px){
    width: 100%;
  }

  &::placeholder {
    padding: 15px;
    
  }
`