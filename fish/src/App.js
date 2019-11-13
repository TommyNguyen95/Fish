import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import StartPage from './views/StartPage';
import PaymentPage from './views/PaymentPage';
import CreateAccount from './views/CreateAccount'
import Store from '../src/state/store';

const App = props => {
  return (
    <Store>
      <Router>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/skapa-konto" component={CreateAccount} />
          <Route exact path="/betala" component={PaymentPage} />
        </Switch>
      </Router>
    </Store>
  )
}

export default App;
