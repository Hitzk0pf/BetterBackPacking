/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { configureStore } from './store';
//import 'grommet/scss/vanilla/index.scss'; we're going to compile this manually, no need for webpack to do that for us
import 'grommet/grommet-aruba.min.css';
import 'toastr/build/toastr.css'
import 'jquery/dist/jquery.min.js'

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

render(
  <AppContainer>
	<App store={store} />
  </AppContainer>,
  mountApp
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default; // eslint-disable-line global-require
    render(
      <AppContainer>
	<NextApp store={store} />
      </AppContainer>,
      mountApp
    );
  });
}
