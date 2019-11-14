
import styled from "styled-components"
import Button from "../../components/Button/Button"
import { Link } from "react-router-dom"

export const StyledLink = styled(Link)`
width:100%;
`


export const StyledButton = styled(Button)`

`

export const StyledUserBox = styled.div`
  border-radius:9px;
  width:80%;
  max-width:400px;
  background-color:none;
  height:300px;
  display:flex;
  justify-content:space-around;
  align-items:center;
  flex-direction:column;
  margin:0 auto;
`

export const StyledUserIconDiv = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  /* position:absolute;
  top:0;
  right:0; */
padding:10px;
  border-radius:9px;
  max-width:100%;
  width:300px;
  margin: 0 auto;
  margin-top:40px;
  background-color:#000000bf;
  cursor: pointer;
`

export const StyledUserIcon = styled.img`
height:30px;

`
export const StyledText = styled.p`
padding-right:5px;
font-size:18px;
color:#FDD100;
margin-right:10px;
font-family: 'Josefin Sans', sans-serif;
margin-bottom:0;
`
