import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import initialState from './state/initialState';

const { Provider } = React.createContext();

ReactDOM.render(
  <Provider state={initialState}>
    <App />
  </Provider>, document.getElementById('root'));

serviceWorker.unregister();
