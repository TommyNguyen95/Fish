import React from 'react'
import { Link } from 'react-router-dom'
import useSubContext from '../../state/useSubContext';
import axios from 'axios'
import './RelationListStyles.scss'


const RelationList = ({ email, id }) => {
  const [state, dispatch] = useSubContext('loginState');

  const deleteChildOnClick = () => {
    axios.delete(`${state.apiEndpoint}/api/user/${id}`)
      .then(response => {
        dispatch({ type: "RESET_STATE", value: response.data.updatedParent })
      })
  }

  return (
    <div className="relation-list">
      <Link to={`/barn-profil/${id}`}>
        <p className="email-text">{email}</p>
      </Link>
      <div className="cross" onClick={deleteChildOnClick}>&#10005;</div>
    </div>
  )
}
export default RelationList