import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import StartPage from './views/StartPage';

const App = props => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={StartPage} />
      </Switch>
    </Router>
  )
}

export default App;
