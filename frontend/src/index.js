import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.scss';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <App />, document.getElementById('root'));

serviceWorker.unregister();