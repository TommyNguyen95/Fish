import React from "react"
import useSubContext from '../../state/useSubContext';
import './HistoryPage.scss'
import Backbutton from "../../components/BackButton"
import moment from 'moment';
import { StyledP } from "./StyledHistory"





const HistoryPage = (props) => {
    const [state, dispatch] = useSubContext('loginState');

    let { transactions, _id } = state.loginState

    if (!transactions) { return null }
    let singleTrans = transactions.map(i => {
        return <div className="single-wrapper">
            <div className="single-trans-wrap">
                <small>{moment(i.date).format('YYYY-MM-DD')}</small>
                <div className="single-trans-box">
                    <div className="typeof" />
                    {_id !== i.From ? (<p> Från: {i.From}</p>) : (<p>Till: {i.To}</p>)}
                </div>

                <div className="msg-wrap"> {i.Message}</div>
            </div>
            <div className="amount-div">
                <StyledP textstyle={_id === i.From ? 1 : 0}> {i.Amount} KR</StyledP>
            </div>
        </div>
    });









    return (<div>
        <Backbutton back={props} />
        <form>
            {singleTrans}
        </form>
    </div>)
}


export default HistoryPage;