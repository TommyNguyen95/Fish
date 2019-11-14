import React from 'react';
import BackButton from '../../components/BackButton';
import {
  StyledText
} from './StyledVerifyPage';

const VerifyPage = () => {
  return (
    <div className="mt-5">
      <BackButton to="/" />
      <StyledText>
        Bekräfta din epost genom länken i mejlet skickat till dig!
        </StyledText>
    </div>
  )
}

export default VerifyPage;

