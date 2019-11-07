import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import initialState from './state/initialState';
import 'normalize.css';

const { Provider } = React.createContext();

ReactDOM.render(
  <Provider state={initialState}>
    <App />
  </Provider>, document.getElementById('root'));

serviceWorker.unregister();
