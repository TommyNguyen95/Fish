import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import RelationList from '../../components/RelationList/RelationList'
import './ProfilePageStyles.scss'
function ProfilePage() {
  const [userData, setUserData] = useState(true)
  return (
    <div className="profile-container">
      <h3>E-post: Skunk@lunk.1337</h3>
      {
        userData ?
          <React.Fragment>
            <h3 className="added-accounts-h2">Tillagda konton:</h3>
            <RelationList></RelationList>
            <Link to="/skapa-konto">
              <Button text="Skapa barnkonto" />
            </Link>
            <p className="remove-account">Ta bort ditt konto</p>
          </React.Fragment> :
          <React.Fragment>
            <Link to="/skapa-konto">
              <Button text="Skapa barnkonto" />
            </Link>
            <p className="remove-account">Ta bort ditt konto</p>
          </React.Fragment>
      }
    </div>

  )
}
export default ProfilePage