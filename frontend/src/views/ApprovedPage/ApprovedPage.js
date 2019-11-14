import React from 'react';
import BackButton from '../../components/BackButton';
import {
  StyledText,
  StyledIcon
} from './StyledApprovedPage';

const ApprovedPage = () => {
  return (
    <div>
      <BackButton to="anvandare" />
      <StyledIcon>
        &#128077;
      </StyledIcon>
      <StyledText>
        Din betalning är skickad!
      </StyledText>
    </div>
  )
}

export default ApprovedPage;
