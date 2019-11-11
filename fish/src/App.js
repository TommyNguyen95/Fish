import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import StartPage from './views/StartPage';
import PaymentPage from './views/PaymentPage';

const App = props => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route exact path="/pay" component={PaymentPage} />
      </Switch>
    </Router>
  )
}

export default App;
