import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import StartPage from './views/StartPage';
import UserPage from './views/UserPage'
import Store from '../src/state/store';

const App = props => {
  return (
    <Store>
      <Router>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/userpage" component={UserPage} />
        </Switch>
      </Router>
    </Store>
  )
}

export default App;
