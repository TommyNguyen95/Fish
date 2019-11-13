import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StartPage from './views/StartPage';
import UserPage from './views/UserPage'
import VerifyPage from './views/VerifyPage';
import PaymentPage from './views/PaymentPage';
import CreateAccount from './views/CreateAccount'
import Store from '../src/state/store';

const App = props => {
  return (
    <Store>
      <Router>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/verify" component={VerifyPage} />
          <Route exact path="/userpage" component={UserPage} />
          <Route exact path="/skapa-konto" component={CreateAccount} />
          <Route exact path="/betala" component={PaymentPage} />
        </Switch>
      </Router>
    </Store>
  )
}

export default App;
