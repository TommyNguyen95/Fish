import React, { useEffect } from 'react';
import BackButton from '../../components/BackButton';
import useSubContext from '../../state/useSubContext';
import {
  StyledText
} from './StyledApprovedPage';

const ApprovedPage = (props) => {
  
  const [state, dispatch] = useSubContext('loginState');
  useEffect(() => {
    dispatch({ type: "SET_LOGO", value: false })
    return function cleanup() {
      dispatch({ type: "SET_LOGO", value: true })
    }
  }, [])
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
