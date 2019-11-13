import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import StartPage from './views/StartPage';
import UserPage from './views/UserPage'
import VerifyPage from './views/VerifyPage';
import PaymentPage from './views/PaymentPage';
import Store from '../src/state/store';

const App = props => {
  return (
    <Store>
    <Router>
      <Switch>
        <Route exact path="/startpage" component={StartPage} />
        <Route exact path="/verify" component={VerifyPage} />
        <Route exact path="/userpage" component={UserPage} />
        <Route exact path="/pay" component={PaymentPage} />
      </Switch>
    </Router>
    </Store>
  )
}

export default App;
