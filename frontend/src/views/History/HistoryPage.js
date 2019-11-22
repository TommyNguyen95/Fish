import React, { useEffect, useState } from "react"
import useSubContext from '../../state/useSubContext';
import './HistoryPage.scss'
import Backbutton from "../../components/BackButton"
import moment from 'moment';
import { StyledP } from "./StyledHistory"
import Axios from 'axios';




const HistoryPage = (props) => {

    const [state, dispatch] = useSubContext('loginState');
    let fromChild;

    let { transactions, _id, relations } = state.loginState

    useEffect(() => {
        Axios.get(`${state.apiEndpoint}/api/login`).then(res => {
            dispatch({ type: "RESET_STATE", value: res.data })
        })
    }, [])



    if (props.location.state === 'undefined') {
        fromChild = false
    }

    if (props.location.state && props.location.state.url === 'barn') {
        fromChild = true

    }

    const ParentTrans = () => {

        if (!transactions) { return <p>No transactions</p> }
        else {
            return transactions.map((i, index) => {
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
        }
    }


    const ChildTrans = () => {


        return relations.map((i, index) => {
            if (i._id === props.location.state.child) {
                return i.transactions.map(k => {

                    return (< div className="single-wrapper" key={index} >
                        <div className="single-trans-wrap">
                            <small>{moment(k.date).format('YYYY-MM-DD')}</small>
                            <div className="single-trans-box">
                                <div className="typeof" />
                                {i._id !== k.From ? (<p> Från: {k.From}</p>) : (<p>Till: {k.To}</p>)}
                            </div>
                            <div className="msg-wrap"> {k.Message}</div>
                        </div>
                        <div className="amount-div">
                            <StyledP textstyle={i._id === k.From ? '-' : ''}> {k.Amount} KR</StyledP>
                        </div>
                    </div >)

                })
            }
        })
    }



    return (<div>
        <Backbutton back={props} />
        <form>
            {fromChild ? <ChildTrans /> : <ParentTrans />}
        </form>
    </div>)
}


export default HistoryPage;