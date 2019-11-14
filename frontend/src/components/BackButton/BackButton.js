import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledBackButton
} from './StyledBackButton';

const BackButton = (props) => {
  return (
    <Link to={props.to}>
      <StyledBackButton size='50px' />
    </Link>
  )
}

export default BackButton