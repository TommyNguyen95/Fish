import {Container} from "reactstrap"
import styled from "styled-components"

export const StyledUserPageContainer  = styled(Container)`
background-color:#0058A3;
max-width:100%;
width:100vw;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
position:relative;
`


export const StyledUserBox  = styled.div`
border-radius:9px;
margin-top:30px;
background-color:none;
width:90%;
height:300px;
display:flex;
justify-content:space-around;
align-items:center;
flex-direction:column;
`

export const StyledUserIconDiv  = styled.div`
display:flex;
justify-content:flex-end;
max-width:100%;
background-color:#0058A3;
padding-top:20px;
position:absolute;
top:0;
right:0;
`

export const StyledUserIcon  = styled.img`
width:50px;
height:50px;
cursor:pointer;
padding-right:20px;
@media (max-width: 768px) {
    padding-right:0;
  }
`
export const StyledText  = styled.p`
color:#FDD100;
margin-right:10px;
font-family: 'Josefin Sans', sans-serif;
`
