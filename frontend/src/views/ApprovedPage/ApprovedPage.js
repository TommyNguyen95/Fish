import React from 'react';
import BackButton from '../../components/BackButton';
import {
  StyledText
} from './StyledApprovedPage';

const ApprovedPage = (props) => {

  return (
    <div>
      <BackButton props={props.props.props} to="/anvandare" />
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
      <StyledText>
        Din betalning är skickad!
      </StyledText>
    </div>
  )
}

export default ApprovedPage;
