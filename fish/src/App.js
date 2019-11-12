import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import StartPage from './views/StartPage';
import VerifyPage from './views/VerifyPage';

const App = props => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route exact path="/verify" component={VerifyPage} />
      </Switch>
    </Router>
  )
}

export default App;
