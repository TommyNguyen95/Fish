import React from 'react'
import './RelationListStyles.scss'
const RelationList = ({ firstName, lastName }) => {
  return (
    <div className="relation-list">
      <p className="email-text">{firstName + ' ' + lastName}</p>
      <div className="cross">&#10005;</div>
    </div>
  )
}
export default RelationList