import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.scss';
import '../src/views/ApprovedPage/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Store from '../src/state/store';
import './registerServiceWorker';

ReactDOM.render(
  <Store><App /></Store>, document.getElementById('root'));

