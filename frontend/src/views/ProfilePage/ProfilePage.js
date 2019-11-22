import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import useSubContext from '../../state/useSubContext';
import Button from '../../components/Button/Button'
import RelationList from '../../components/RelationList/RelationList'
import Text from '../../components/Text'
import BackButton from '../../components/BackButton';
import './ProfilePageStyles.scss'





const ProfilePage = (props) => {
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
  }, [dispatch, state.apiEndpoint])


  const deleteUser = async () => {
    if (window.confirm('Are you sure you want to delete you profile?')) {
      await Axios.delete(`${state.apiEndpoint}/api/user/${userState._id}`)
        .then(response => {
          dispatch({ type: "RESET_STATE", value: response.data })
          props.history.push("/")
          dispatch({ type: "RESET_STATE", value: response.data })

        })
    }
  }

  const logOut = async () => {
    await Axios.delete(`${state.apiEndpoint}/api/login`)
      .then(res => {
        dispatch({ type: "RESET_STATE", value: res.data })
        props.history.push("/")
      })
  }

  return (
    <div className="profile-container">
      <BackButton to="anvandare" />
      <Text text={userState.firstname + " " + userState.lastname} />
      <Text text={`Epost: ${userState.username}`} />
      {renderChildsAccounts()}
      <Link to="/skapa-konto">
        <Button text="Skapa barnkonto" />
      </Link>
      <Button text="Logga ut" onClick={logOut} />
      <p className="remove-account" onClick={deleteUser}>Ta bort ditt konto</p>
    </div>
  )
}
export default ProfilePage