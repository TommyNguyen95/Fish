import React from 'react';
import BackButton from '../../components/BackButton';
import {
    StyledText
} from './StyledVerifyPage';

const VerifyPage = (props) => {
    return (
        <div>
            <BackButton props={props} to="/" />
            <StyledText>
                Bekräfta din epost genom länken i mejlet skickat till dig!
       </StyledText>
        </div>
    )
}

export default VerifyPage;