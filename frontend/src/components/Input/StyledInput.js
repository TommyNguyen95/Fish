import styled from 'styled-components';

export const StyledInput = styled.input`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.1rem;
  min-width: 100%;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 3px;
  text-transform: ${({ capitalize }) => capitalize ? 'capitalize' : 'none'};
`