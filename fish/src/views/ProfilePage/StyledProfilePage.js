import styled from "styled-components"
import {Container,Row, Col} from "reactstrap"

export const StyledProfilePageContainer = styled(Container) `
background-color:#0058A3;
width:100vw;
height:100vh;
`

export const LogoRow = styled(Row)  `
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`
export const LogoCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
` 
export const ProfileMainRow = styled(Row) `
`

export const ProfileMainCol = styled(Col) `
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`