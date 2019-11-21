import React from 'react'
import { Link } from 'react-router-dom'
import useSubContext from '../../state/useSubContext';
import axios from 'axios'
import './RelationListStyles.scss'


const RelationList = ({ userData }) => {
  const [state, dispatch] = useSubContext('loginState');

  console.log(userData)

  const deleteChildOnClick = () => {
    axios.delete(`${state.apiEndpoint}/api/user/${userData._id}`)
      .then(response => {
        dispatch({ type: "RESET_STATE", value: response.data.updatedParent })
      })
  }

  return (
    <div className="relation-list">
      <Link userData={userData} to={`/barn-profil/${userData._id}`}>
        <p className="email-text">{userData.username}</p>
      </Link>
      <div className="cross" onClick={deleteChildOnClick}>&#10005;</div>
    </div>
  )
}
export default RelationList