 import {Button} from "reactstrap"
 import styled from "styled-components"

 export const StyledButton = styled(Button)`
 cursor:pointer;
 border:none;
 border-radius:9px;
 background-color: #FDD100;
 font-family: 'Josefin Sans', sans-serif;
 max-width:400px;
 width:${props => props.width ? props.width : '80%'  };
 height:${props => props.height ? props.height : '70px' };
 font-size:${props => props.fontSize  ? props.fontSize : '1.6rem' };
 &:hover {
   cursor: pointer;
   background-color: #ffe152;
 }
 &:active {
   opacity: 0.9;
 }
 `