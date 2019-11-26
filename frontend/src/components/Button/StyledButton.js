import styled from "styled-components"

export const StyledButton = styled.button`
  background-color: #FDD100;
  font-family: 'Josefin Sans', sans-serif;
  font-size: ${props => props.fontsize ? props.fontsize : "1.6rem"};
  min-width: 100%;
  border: none;
  padding: 1rem 0 !important;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    background-color: #ffe152;
  }
  &:active {
    opacity: 0.9;
  }
 `