import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import StartPage from './views/StartPage';
import UserPage from './views/UserPage';
import ApprovedPage from './views/ApprovedPage';
import PaymentPage from './views/PaymentPage';
import CreateAccount from './views/CreateAccount';
import ProfilePage from './views/ProfilePage/ProfilePage';
import History from "./views/History/HistoryPage"
import ChildPage from "./views/ChildPage/ChildPage"
import RecoverPassword from './views/RecoverPassword';
import { Container } from 'reactstrap';
import useSubContext from './state/useSubContext';
import axios from 'axios';

axios.interceptors.request.use(
  function (config) {
    config.withCredentials = true
    return config
  },
  function error() {
    return Promise.reject(error)
  }
)

const App = props => {
  const [state, dispatch] = useSubContext('loginState');
  const Logo = () => {
    return (
      <React.Fragment>
        {state.loginState.showLogo &&
          <Container className="logo">
            <Link to="/">
              <img src="/images/fishlogo.svg" alt="" />
              <p className="text-center">När du vill skicka en lax eller en röding</p>
            </Link>
          </Container>
        }
      </React.Fragment>
    )
  }
  const Footer = () => {
    return (
      <Container className="footer">
        <p className="text-center">Optional footer</p>
      </Container>
    )
  }
  useEffect(() => {
    async function checkStatus() {
      axios({
        method: 'get',
        url: `${state.apiEndpoint}/api/login`
      }).then(response => {
        if (!response.data._id) return;
        state.loginState.isLoggedIn = true;
        state.loginState = { ...response.data }
        dispatch({ type: "RESET_STATE", value: state.loginState })
      }).catch(response => {
        console.log("error", response)
      })
    }
    checkStatus()
  }, [])

  return (
    <main className="wrapper">
      <Router>
        <Logo />
        <Container>
          <Switch>
            <Route exact path="/" component={StartPage} />
            <Route exact path="/anvandare" component={UserPage} />
            <Route exact path="/godkant" component={ApprovedPage} />
            <Route exact path="/skapa-konto" component={CreateAccount} />
            <Route exact path="/betala" component={PaymentPage} />
            <Route exact path="/profil" component={ProfilePage} />
            <Route exact path="/historik" component={History} />
            <Route exact path="/barn-profil/:id" component={ChildPage} />
            <Route exact path="/aterstallning" component={RecoverPassword} />
          </Switch>
        </Container>
      </Router>
    </main>
  )
}

export default App;
