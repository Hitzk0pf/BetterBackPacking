/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from './modules/App/components/DevTools';
import rootReducer from './reducers';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

export function configureStore(initialState = {}) {
  let socket = io('http://localhost:3000');
  let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');


  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(thunk),
    applyMiddleware(socketIoMiddleware)
  ];

  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }

  const store = createStore(rootReducer, initialState, compose(...enhancers));

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
