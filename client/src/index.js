import React from 'react';
import ReactDOM from 'react-dom';
import { Frontload } from 'react-frontload';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from './redux/history';
import configureStore from './redux/configureStore';
import { getToken } from './utils/store';
import { apiService } from './services/api/index';
// import { ConnectedRouter } from 'connected-react-router';
// import { createBrowserHistory, createMemoryHistory } from 'history';
// import 'localstorage-polyfill';
import './assets/sass/index.scss';
import App from './routes/App';
import * as serviceWorker from './serviceWorker';

// const isServer = !(
//   typeof window !== 'undefined' &&
//   window.document &&
//   window.document.createElement
// );

// const history = isServer
//   ? createMemoryHistory({
//       initialEntries: ['/']
//     })
//   : createBrowserHistory();

// const Application = (
//   <ConnectedRouter history={history}>
//     <Frontload noServerRender={true}>
//       <App />
//     </Frontload>
//   </ConnectedRouter>
// );
//

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

// Set token
if (getToken('access_token')) {
  console.log('Index token: ', getToken('access_token'));
  apiService.setAuthorizationHeader(getToken('access_token'));
}

const Application = (
  <Frontload noServerRender={true}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConnectedRouter>
    </Provider>
  </Frontload>
);

const root = document.getElementById('root');

if (root.hasChildNodes() === true) {
  // If it's an SSR, we use hydrate to get fast page loads by just
  // attaching event listeners after the initial render
  ReactDOM.hydrate(Application, root);
} else {
  // If we're not running on the server, just render like normal
  ReactDOM.render(Application, root);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
