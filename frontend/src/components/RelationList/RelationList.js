import React from 'react'
import './RelationListStyles.scss'
const RelationList = ({ email }) => {
  return (
    <div className="relation-list">
      <p className="email-text">{email}</p>
      <div className="cross">&#10005;</div>
    </div>
  )
}
export default RelationList