import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import StartPage from './views/StartPage';
import Store from '../src/state/store';
import UserPage from './views/UserPage'

const App = props => {
  return (
    <Store>
      <Router>
        <Switch>
          <Route exact path="/" component={StartPage} />
        </Switch>
      </Router>
    </Store>
        <Route exact path="/userpage" component={UserPage} />
  )
}

export default App;
