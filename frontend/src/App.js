import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import StartPage from './views/StartPage';
import UserPage from './views/UserPage';
import PaymentPage from './views/PaymentPage';
import CreateAccount from './views/CreateAccount';
import ProfilePage from './views/ProfilePage/ProfilePage';
import AdminPage from './views/AdminPage';
import History from "./views/History/HistoryPage"
import ChildPage from "./views/ChildPage/ChildPage"
import RecoverPassword from './views/RecoverPassword';
import PageNotFound from './views/PageNotFound/PageNotFound';
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

const App = () => {
  const [state, dispatch] = useSubContext('loginState');
  const Logo = () => {
    const [route, setRoute] = useState()
    function logoToggler() {
      if (state.loginState.role !== 'visitor') {
        setRoute(<Redirect to="/anvandare" />)
      } else {
        setRoute(<Redirect to="/" />)
      }
    }
    return (
      <React.Fragment>
        {state.transactionState.showLogo &&
          <Container className="logo">
            <span onClick={logoToggler}>
              <img src="/images/fishlogo.svg" alt="" />
              <p className="text-center">När du vill skicka en lax eller en röding</p>
            </span>
            {route}
          </Container>
        }
      </React.Fragment>
    )
  }

  useEffect(() => {
    async function checkStatus() {
      axios({
        method: 'get',
        url: `${state.apiEndpoint}/api/login`
      }).then(response => {
        if (!response.data._id) {
          state.loginState.role = 'visitor';
          dispatch({ type: "RESET_STATE", value: state.loginState })
        }
        state.loginState = { ...response.data }
        state.loginState.isLoggedIn = true;
        dispatch({ type: "RESET_STATE", value: state.loginState })
      }).catch(response => {
        console.log("error", response)
      })
    }
    checkStatus()
    // eslint-disable-next-line
  }, [])


  const redirector = () => {
    if (!state.loginState.role) return;
    function checkPath(pathnames) {
      let status = false;
      pathnames.map(x => {
        if (window.location.pathname === x) {
          status = true
        }
        return null
      })
      return status;
    }
    if (state.loginState.role === 'visitor') {
      let stay = ['/aterstallning', '/skapa-konto']
      return checkPath(stay) ? null : <Redirect to="/" />
    }

    if (state.loginState.role === 'child' || state.loginState.role === 'parent') {
      let stay = ['/anvandare', '/betala', '/profil', '/transaktioner', '/historik', '/barn-profil']
      return checkPath(stay) ? null : <Redirect to="/anvandare" />
    }
  }

  return (
    <main className="wrapper">
      <Router>
        <Logo />
        <Container>
          <Switch>
            <Route exact path="/anvandare" component={UserPage} />
            <Route exact path="/skapa-konto" component={CreateAccount} />
            <Route exact path="/betala" component={PaymentPage} />
            <Route exact path="/profil" component={ProfilePage} />
            <Route exact path="/transaktioner" component={AdminPage} />
            <Route exact path="/historik" component={History} />
            <Route exact path="/barn-profil/:id" component={ChildPage} />
            <Route exact path="/404" component={PageNotFound} />
            <Route exact path="/" component={StartPage} />
            <Route exact path="/skapa-konto" component={CreateAccount} />
            <Route exact path="/aterstallning" component={RecoverPassword} />
            <Route path="*" component={PageNotFound} />
          </Switch>
          {redirector()}
        </Container>
      </Router>
    </main>
  )
}

export default App;
