import React, { useEffect } from "react"
import useSubContext from '../../state/useSubContext';
import './HistoryPage.scss'
import Backbutton from "../../components/BackButton"
import moment from 'moment';
import { StyledP } from "./StyledHistory"
import Axios from 'axios';




const HistoryPage = (props) => {
    const [state, dispatch] = useSubContext('loginState');

    let { transactions, _id } = state.loginState

    useEffect(() => {
        Axios.get(`${state.apiEndpoint}/api/login`).then(res => {
            dispatch({ type: "RESET_STATE", value: res.data })
        })
    }, [])

    if (!transactions) { return <p>No transactions</p> }
    let singleTrans = transactions.map((i, index) => {
        return <div className="single-wrapper" key={index}>
            <div className="single-trans-wrap">
                <small>{moment(i.date).format('YYYY-MM-DD')}</small>
                <div className="single-trans-box">
                    <div className="typeof" />
                    {_id !== i.From ? (<p> Från: {i.From}</p>) : (<p>Till: {i.To}</p>)}
                </div>

                <div className="msg-wrap"> {i.Message}</div>
            </div>
            <div className="amount-div">
                <StyledP textstyle={_id === i.From ? '-' : ''}> {i.Amount} KR</StyledP>
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