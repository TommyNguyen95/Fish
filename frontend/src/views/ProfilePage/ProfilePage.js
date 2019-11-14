import React, { useState } from 'react'
import Button from '../../components/Button/Button'
import RelationList from '../../components/RelationList/RelationList'
import './ProfilePageStyles.scss'
function ProfilePage() {
  const [userData, setUserData] = useState(true)
  return (
    <div className="profile-page">
      <div className="row">
        <div className="col main-profile">
          <h2>E-post: Skunk@lunk.1337</h2>
          {
            userData ?
              <React.Fragment>
                <h2>Tillagda konton</h2>
                <RelationList></RelationList>
                <Button text="Skapa barnkonto"></Button>
                <p className="remove-account">Ta bort ditt konto</p>
              </React.Fragment> :
              <Button text="Skapa barnkonto" />
          }
        </div>
      </div>
    </div>
  )
}
export default ProfilePage