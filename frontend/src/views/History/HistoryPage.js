import React, { useEffect } from "react"
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
    Axios.get(`/api/login`).then(res => {
      dispatch({ type: "RESET_STATE", value: res.data })
    })
    // eslint-disable-next-line
  }, [])


  transactions = transactions.reverse()


  const ParentTrans = () => {
    if (transactions === undefined) { return <p className="no-transaction-text"> Inga transaktioner :(</p> }
    if (transactions.length === 0) { return <p className="no-transaction-text"> Inga transaktioner :(</p> }
    else {
      return transactions.map((i, index) => {
        let { firstname, lastname, username } = i.receiver

        return <div className="single-wrapper" key={index}>
          <div className="single-trans-wrap">
            <small className="date">{moment(i.date).format('YYYY-MM-DD')}</small>
            <div className="single-trans-box">
              {_id !== i.from ? (<p className="persontext">{i.sender.firstname + ' ' + i.sender.lastname}</p>) : (<p>{firstname + ' ' + lastname}</p>)}
              {_id !== i.from ? (<small>{i.sender.username}</small>) : (<small>{username}</small>)}

            </div>

            <div className="msg-wrap"> {i.message}</div>
          </div>
          <div className="amount-div">
            <StyledP textstyle={_id === i.from ? '-' : ''}> {i.amount.toLocaleString()} SEK</StyledP>
          </div>
        </div>
      });
    }
  }


  const ChildTrans = () => {

    // eslint-disable-next-line
    return relations.map((i, index) => {

      if (i._id === props.location.state.child) {

        if (i.transactions.length === 0) { return <p className="no-transaction-text" key={index}> Inga transaktioner :(</p> }

        return i.transactions.slice(0).reverse().map((k, index) => {


          let { firstname, lastname, username } = k.receiver
          return (<div className="single-wrapper" key={index}>
            <div className="single-trans-wrap">
              <small className="date">{moment(i.date).format('YYYY-MM-DD')}</small>
              <div className="single-trans-box">
                {_id !== i.from ? (<p className="persontext">{k.sender.firstname + ' ' + k.sender.lastname}</p>) : (<p>{firstname + ' ' + lastname}</p>)}
                {_id !== i.from ? (<small>{k.sender.username}</small>) : (<small>{username}</small>)}

              </div>

              <div className="msg-wrap"> {k.message}</div>
            </div>
            <div className="amount-div">
              <StyledP textstyle={_id !== k.from ? '-' : ''}> {k.amount.toLocaleString()} KR</StyledP>
            </div>
          </div>)

        })
      }
    })
  }

  if (props.location.state && props.location.state.url === 'barn') {
    ChildTrans()
    fromChild = true

  } else {
    ParentTrans()
    fromChild = false
  }



  return (<div>
    <Backbutton back={props} />
    <form>
      {fromChild ? <ChildTrans /> : <ParentTrans />}
    </form>
  </div>)
}


export default HistoryPage;