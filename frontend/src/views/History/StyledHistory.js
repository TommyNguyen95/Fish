import styled from 'styled-components'


export const StyledP = styled.p`
color:${props => props.textstyle ? 'red' : 'green'};


&:before {
    content: '${props => (props.textstyle ? "-" : "")}';
  }
`