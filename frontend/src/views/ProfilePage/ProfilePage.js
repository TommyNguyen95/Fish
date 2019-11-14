import React, { useState } from 'react'
import Button from '../../components/Button/Button'
import RelationList from '../../components/RelationList/RelationList'
import './ProfilePageStyles.scss'
function ProfilePage() {
  const [userData, setUserData] = useState(true)
  return (
    <div>
      <div className="profile-container">
        <h3>E-post: Skunk@lunk.1337</h3>
        {
          userData ?
            <React.Fragment>
              <h3 className="added-accounts-h2">Tillagda konton</h3>
              <RelationList></RelationList>
              <Button text="Skapa barnkonto"></Button>
              <p className="remove-account">Ta bort ditt konto</p>
            </React.Fragment> :
            <Button text="Skapa barnkonto" />
        }
      </div>
    </div>

  )
}
export default ProfilePage