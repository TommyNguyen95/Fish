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
    const fetchData = async () => {
      await Axios.get(`/api/login`).then(res => {
        dispatch({ type: "RESET_STATE", value: res.data })
      })
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleActiveOrInactiveAccount = (active, callback) => {
    if (window.confirm('Är du säker på att du vill avaktivera ditt konto?')) {
      Axios.patch(`/api/activate/${userState._id}`, { active })
        .then(response => {
          if (callback) {
            callback({})
          }
        })
    }
  }

  const resetState = (response) => {
    dispatch({ type: "RESET_STATE", value: response })
    props.history.push("/")
  }

  const logOut = (callback) => {
    Axios.delete(`/api/login`)
      .then(res => {
        if (callback) {
          callback(res.data)
        }
      })
  }

  return (
    <div className="profile-container">
      <BackButton back={props} />
      <Text text={userState.firstname + " " + userState.lastname} />
      <Text text={`Epost: ${userState.username}`} />
      {renderChildsAccounts()}
      {
        userState.role === 'child' ?
          null :
          <Link to="/skapa-konto">
            <Button text="Skapa barnkonto" />
          </Link>
      }
      <Button text="Logga ut" onClick={() => { logOut(resetState) }} />
      <p className="remove-account" onClick={() => { handleActiveOrInactiveAccount(false, resetState) }}>Avaktivera ditt konto</p>
    </div>
  )
}
export default ProfilePage