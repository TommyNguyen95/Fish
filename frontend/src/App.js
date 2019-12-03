import React, { useEffect } from 'react';
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
import socketIo from 'socket.io-client';

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
  const [socket, setSocket] = React.useState(null);

  const redirect = () => {
    if (state.loginState.active && window.location.pathname === '/') {
      return <Redirect to="/anvandare" />
    }
  }


  const Logo = () => {
    return (
      <React.Fragment>
        {state.transactionState.showLogo &&
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

  useEffect(() => {
    async function checkStatus() {
      axios({
        method: 'get',
        url: `${state.apiEndpoint}/api/login`
      }).then(response => {
        if (!response.data._id) return;
        setSocket(socketIo('http://localhost:3001'))
        state.loginState.isLoggedIn = true;
        state.loginState = { ...response.data }
        dispatch({ type: "RESET_STATE", value: state.loginState })
      }).catch(response => {
        console.log("error", response)
      })
    }
    checkStatus()
    // eslint-disable-next-line
  }, [])

  return (
    <main className="wrapper">
      <Router>
        <Logo />
        <Container>
          {state.loginState.active ? <Switch>
            <Route
              exact
              path="/anvandare"
              render={() => <UserPage socket={socket} />}
            />
            <Route
              exact
              path="/skapa-konto"
              component={CreateAccount}
            />
            <Route
              exact
              path="/betala"
              render={() => <PaymentPage socket={socket} />}
            />
            <Route
              exact
              path="/profil"
              render={() => <ProfilePage socket={socket} />}
            />
            <Route
              exact
              path="/transaktioner"
              render={() => <AdminPage socket={socket} />}
            />
            <Route
              exact
              path="/historik"
              render={() => <History socket={socket} />}
            />
            <Route
              exact
              path="/barn-profil/:id"
              render={() => <ChildPage socket={socket} />}
            />
            <Route
              exact
              path="/404"
              component={PageNotFound}
            />
            {redirect()}
            <Redirect to="/404" />
          </Switch> : <Switch>
              <Route
                exact
                path="/"
                render={() => <StartPage socket={socket} />}
              />
              <Route
                exact
                path="/skapa-konto"
                render={() => <CreateAccount socket={socket} />}
              />
              <Route
                exact
                path="/aterstallning"
                render={() => <RecoverPassword socket={socket} />}
              />
              <Route
                path="*"
                component={PageNotFound} />
            </Switch>}
        </Container>
      </Router>
    </main>
  )
}

export default App;
