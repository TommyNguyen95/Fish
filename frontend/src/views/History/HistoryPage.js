import React from "react"
import useSubContext from '../../state/useSubContext';
import './HistoryPage.scss'
import Backbutton from "../../components/BackButton"






const HistoryPage = (props) => {
    const [state, dispatch] = useSubContext('loginState');




    let { transactions } = state.userState
    let singleTrans = transactions.map(i => {
        console.log(i)
        return <div className="single-trans-wrap">
            <div className="single-trans-box">
                <div className="typeof" />
                <p>Från: {i.From}</p>
                <p>Till: {i.To}</p>
                <p>Belopp: {i.Amount}</p>
                <div className="msg-wrap"> {i.Message}</div>
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