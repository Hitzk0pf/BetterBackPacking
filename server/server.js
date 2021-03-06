import Express from 'express';
import compression from 'compression';
// import mongoose from 'mongoose';
import bodyParser from 'body-parser';
let Sequelize = require('sequelize');
import path from 'path';
import IntlWrapper from '../client/modules/Intl/IntlWrapper';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import callApi from '../client/util/apiCaller'
// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import users from './routes/user.routes';
import tours from './routes/tour.routes';
import guideInfos from './routes/guideInfo.routes';
import authRoutes from './routes/auth.routes';
import dummyData from './dummyData';
import serverConfig from './config';
let passport = require('passport');

// Set native promises as mongoose promise
// mongoose.Promise = global.Promise;

// Sequelize and (still) MongoDB Connection

//const User = sequelize.import('./models/user');
//const User = userModel(sequelize, Sequelize);

//User.findAll().then(function(users) {
//	  console.log("USERS: ", users);
//})

// mongoose.connect(serverConfig.mongoURL, (error) => {
//   if (error) {
//     console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
//     throw error;
//   }
//
//   // feed some dummy data in DB.
//   dummyData();
// });

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist')));

// initialize passport
app.use(passport.initialize());
require('./auth/auth.js')(passport);

// app.use('/api', posts);
app.use('/api', users);
app.use('/api', tours);
app.use('/api', guideInfos);
app.use('', authRoutes);

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <IntlWrapper>
              <RouterContext {...renderProps} />
            </IntlWrapper>
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch((error) => next(error));
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

// start socket.io server on port 3000

const http = require('http');
const server = http.createServer();
const socketIo = require('socket.io');
let connectedUsers = [];
server.listen(3000);
const io = socketIo();
io.attach(server);
let allClients = [];
io.on('connection', function (socket) {
  console.log('Socket connected: ', socket.id);
  socket.on('action', (action) => {
    console.log('ACTION', action)
    if (action.type === 'server/is_online') {
      console.log('Got is_online!', action.token);
      allClients.push({ socket, cuid: action.cuid });
      // socket.emit('action', { type: 'user_online', data: action.cuid });
      // broadcast that the user has gone online to every other client
      io.sockets.emit('action', { type: 'user_online', data: action.cuid });

      callApi(`users/${action.cuid}/online`, 'get', action.token, {} // send JWT Token to authenticate (otherwise its '')
      ).then(res => {
        if (res.success) {
          // socket.emit('action', { type: 'user_online', data: action.cuid });
          console.log('AUTH SUCCESS');
        }
      });
    }
    if (action.type === 'server/send_message') {
      console.log('Got msg!', action.message);
      // expects an action with message (string) and receiver (array of cuids)
      const receiverClients = allClients.filter(client => action.receivers.indexOf(client.cuid) !== -1)
      const sender = allClients.filter(client => socket.id === client.socket.id)[0].cuid;
      // receiverClients.map(receiver => socket.emit('action', {
      for (let i = 0; i < receiverClients.length; i++) {
        receiverClients[i].socket.emit('action', {
          type: 'receive_message',
          data: {
            message: action.message,
            sender,
          }
        });
      }

      let message = {
          senderCuid: sender,
          receiverCuid: receiverClients[0].cuid,
          message: action.message,
      };

      callApi(`chatMessages`, 'post', '', message).then(res => {
        console.log('saving msg done:', res);
      });
      // callApi(`users/${action.cuid}/online`, 'get', action.token, {} // send JWT Token to authenticate (otherwise its '')
      // ).then(res => {
      //   if (res.success) {
      //     socket.emit('action', { type: 'user_online', data: action.cuid });
      //     console.log('AUTH SUCCESS');
      //   }
      // });
    }

    socket.on('disconnect', () => {
      const disconnectedUser = allClients.filter(client => socket.id === client.socket.id)[0];
      if (!disconnectedUser) {
        return;
      }

      io.sockets.emit('action', { type: 'user_offline', data: disconnectedUser.cuid });
      allClients = allClients.filter(client => client.socket !== socket);
      callApi(`users/${action.cuid}/offline`, 'get', action.token, {} // send JWT Token to authenticate (otherwise its '')
      ).then(res => {
        if (res.success) {
          socket.emit('action', { type: 'user_offline', data: socket.id });
        }
      });
    })

    if (action.type === 'server/hello') {
      console.log('Got hello data!', action.data);
      socket.emit('action', { type: 'message', data: 'good day!' });
    }
  });
});

export default app;
