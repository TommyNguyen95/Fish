import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.scss';
import '../src/views/ApprovedPage/style.scss'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Store from '../src/state/store';

ReactDOM.render(
  <Store><App /></Store>, document.getElementById('root'));

serviceWorker.unregister();
