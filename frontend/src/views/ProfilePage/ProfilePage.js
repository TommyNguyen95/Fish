import React, { useState, useEffect } from 'react'
import Button from '../../components/Button/Button'
import RelationList from '../../components/RelationList/RelationList'
import Text from '../../components/Text'
import { Link } from 'react-router-dom'
import useSubContext from '../../state/useSubContext';
import axios from 'axios'
import './ProfilePageStyles.scss'



const ProfilePage = () => {
  const state = useSubContext('userState')[0];
  const [data, setData] = useState([])
  let relations = data.relations
  relations = null

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${state.apiEndpoint}/api/user/${state.userState._id}`
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="profile-container">
      <Text text={data.firstname} textInput={data.lastname} />
      <Text text="E-post:" textInput={data.username} />
      {
        relations ?
          <React.Fragment>
            <h3 className="added-accounts-h3">Tillagda konton:</h3>
            {relations.map(child =>
              <Link to={`/barn-profil/${child._id}`} key={child._id}>
                <RelationList email={child.username} />
              </Link>
            )}
          </React.Fragment>
          :
          <React.Fragment>
          </React.Fragment>
      }
      <Link to="/skapa-konto">
        <Button text="Skapa barnkonto" />
      </Link>
      <p className="remove-account">Ta bort ditt konto</p>
    </div>
  )
}
export default ProfilePage