/* eslint-disable global-require */
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './modules/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
    require.ensure = function requireModule(deps, callback) {
        callback(require);
    };
}

/* Workaround for async react routes to work with react-hot-reloader till
 https://github.com/reactjs/react-router/issues/2182 and
 https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
    // Require async routes only in development for react-hot-reloader to work.
    require('./modules/Post/pages/PostListPage/PostListPage');
    require('./modules/Post/pages/PostDetailPage/PostDetailPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
    <Route path="/" component={App}>
        <IndexRoute
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
                });
            }}
        />

        <Route
            path="/posts/:slug-:cuid"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
                });
            }}
        />

        <Route
            path="/fbLogin"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/User/pages/LoginPage/FacebookLoginPage').default);
                });
            }}
        />
        <Route
            path="/login"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/User/pages/LoginPage/LoginPage').default);
                });
            }}
        />
        <Route
            path="/uploadProfilePicture"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/Guide/pages/InitialPageWizard/InitialPageWizard').default);
                });
            }}
        />
        <Route
            path="/register"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/User/pages/RegisterPage/RegisterPage').default);
                });
            }}
        />
        <Route
            path="/search"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/App/pages/TourSearchPage').default);
                });
            }}
        />

        <Route
            path="/guide/:guideCuid"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/Guide/pages/ProfilePage/ProfilePage').default);
                });
            }}
        />

    </Route>
);
