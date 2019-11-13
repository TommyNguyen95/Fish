import React, { useState } from 'react'
import { StyledProfilePageContainer, LogoRow, LogoCol, ProfileMainRow, ProfileMainCol } from "./StyledProfilePage"
import Logo from "../../components/Logo/Logo"
import Button from '../../components/Button/Button'


function ProfilePage() {

  const [userData, setUserData] = useState(true)

  return (
    < StyledProfilePageContainer >
      <LogoRow>
        <LogoCol>
          <Logo />
        </LogoCol>
      </LogoRow>
      <ProfileMainRow>
        <ProfileMainCol>
          <h2>E-post:</h2>
          {
            userData ?
              <div>
                <h2>Tillagda konton</h2>
                
              </div>
              : <Button text="Skapa barnkonto"></Button>
          }
        </ProfileMainCol>
      </ProfileMainRow>
    </StyledProfilePageContainer >
  )
}

export default ProfilePage