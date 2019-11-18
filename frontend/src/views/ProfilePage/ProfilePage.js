import React, { useState, useEffect } from 'react'
import Button from '../../components/Button/Button'
import RelationList from '../../components/RelationList/RelationList'
import Text from '../../components/Text'
import { Link } from 'react-router-dom'
import useSubContext from '../../state/useSubContext';
import axios from 'axios'
import './ProfilePageStyles.scss'



const ProfilePage = () => {
  const [state, dispatch] = useSubContext('userState');
  const [data, setData] = useState([])
  console.log(state)
  let relations = state.userState.relations

  axios
    .get(`${state.apiEndpoint}/api/user/${state.userState._id}`)
    .then(response => {
      console.log(response)
    })

  console.log(data)
  return (
    <div className="profile-container">
      <Text text={state.userState.firstname} textInput={state.userState.lastname}></Text>
      {
        relations ?
          <React.Fragment>
            <h3 className="added-accounts-h3">Tillagda konton:</h3>
            {relations.map(child => <RelationList firstName={child.firstname} lastName={child.lastname} />)}
            <Link to="/skapa-konto">
              <Button text="Skapa barnkonto" />
            </Link>
            <p className="remove-account">Ta bort ditt konto</p>
          </React.Fragment>
          :
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