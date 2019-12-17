import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import StartPage from './views/StartPage';
import UserPage from './views/UserPage';
import PaymentPage from './views/PaymentPage';
import CreateAccount from './views/CreateAccount';
import ProfilePage from './views/ProfilePage/ProfilePage';
import AdminPage from './views/AdminPage';
import History from "./views/History/HistoryPage"
import ChildPage from "./views/ChildPage/ChildPage"
import RecoverPassword from './views/RecoverPassword';
import { Container } from 'reactstrap';
import useSubContext from './state/useSubContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SSE from 'easy-server-sent-events/sse';
const sse = new SSE('/api/sse');

sse.listen('message', (data) => {
  toast(data)
});

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
  toast.configure()

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
            <span>
              <img src="/images/fishlogo.svg" alt="" />
              <p className="text-center">När du vill skicka en lax eller en röding</p>
            </span>
          </Container>
        }
      </React.Fragment>
    )
  }

  useEffect(() => {
    async function checkStatus() {
      axios({
        method: 'get',
        url: `/api/login`
      }).then(response => {
        if (!response.data._id) return;
        state.loginState.isLoggedIn = true;
        state.loginState = { ...response.data }
        dispatch({ type: "RESET_STATE", value: state.loginState })
        toast(`Välkommen tillbaka ${state.loginState.firstname}!`)
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
          {state.loginState.active ? <Switch>
            <Route
              exact
              path="/anvandare"
              render={() => <UserPage />}
            />
            <Route
              exact
              path="/skapa-konto"
              component={CreateAccount}
            />
            <Route
              exact
              path="/betala"
              render={() => <PaymentPage />}
            />
            <Route
              exact
              path="/profil"
              render={(props) => <ProfilePage  {...props} />}
            />
            <Route
              exact
              path="/transaktioner"
              render={() => <AdminPage />}
            />
            <Route
              exact
              path="/historik"
              render={(props) => <History  {...props} />}
            />
            <Route
              exact
              path="/barn-profil/:id"
              render={(props) => <ChildPage  {...props} />}
            />
            {redirect()}
          </Switch> : <Switch>
              <Route
                exact
                path="/"
                component={StartPage}
              />
              <Route
                exact
                path="/skapa-konto"
                component={CreateAccount}
              />
              <Route
                exact
                path="/aterstallning"
                component={RecoverPassword}
              />
            </Switch>}
        </Container>
      </Router>
    </main>
  )
}

export default App;
