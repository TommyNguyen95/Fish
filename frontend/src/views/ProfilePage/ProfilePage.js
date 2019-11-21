import React, { useEffect } from 'react'
import Button from '../../components/Button/Button'
import RelationList from '../../components/RelationList/RelationList'
import Text from '../../components/Text'
import { Link } from 'react-router-dom'
import useSubContext from '../../state/useSubContext';
import './ProfilePageStyles.scss'
import Axios from 'axios';



const ProfilePage = () => {
  const [state, dispatch] = useSubContext('loginState');
  const userState = state.loginState

  const renderChildsAccounts = () => {
    if (userState.relations) {
      return (
        <React.Fragment>
          <h3 className="added-accounts-h3">Tillagda konton:</h3>
          {userState.relations.map((child, i) =>
            <RelationList userdata={child} key={i} />
          )}
        </React.Fragment>
      )
    }
  }

  useEffect(() => {
    Axios.get(`${state.apiEndpoint}/api/login`).then(res => {
      dispatch({ type: "RESET_STATE", value: res.data })
    })
  }, [])

  return (
    <div className="profile-container">
      <Text text={userState.firstname} textInput={userState.lastname} />
      <Text text="E-post:" textInput={userState.username} />
      {renderChildsAccounts()}
      <Link to="/skapa-konto">
        <Button text="Skapa barnkonto" />
      </Link>
      <p className="remove-account">Ta bort ditt konto</p>
    </div>
  )
}
export default ProfilePage