import {Router} from 'express';
import * as UserController from '../controllers/user.controller';
import config from '../config';
import colors from 'colors';

var passport = require('passport');
var jwt = require('jsonwebtoken');

const router = new Router();

// Authenticate User
router.route('/auth').post(passport.authenticate('jwt', {session: false}), (req, res) => {
    let userFromJWT = req.user;

    userFromJWT['password_digest'] = ''; //remove password from JWT (obvious why)
    res.json({authenticationSuccess: true, authenticatedUser: userFromJWT});
});

// Get all Users
router.route('/users').get(UserController.getUsers);

// get one user
router.route('/users/:cuid').get(UserController.getUser);

// set LastSeen property of user to current timestamp
router.route('/users/:cuid/online').get(passport.authenticate('jwt', {session: false}), (req, res) => {
  if(req.user.cuid === req.params.cuid) {
    // if user in JWT token is the same than he/she is trying to update, allow it
    UserController.wentOnline(req, res);
  } else {
    res.status(403).send();
  }
});

router.route('/users/:cuid/offline').get(passport.authenticate('jwt', {session: false}), (req, res) => {
  if(req.user.cuid === req.params.cuid) {
    // if user in JWT token is the same than he/she is trying to update, allow it
    UserController.wentOffline(req, res);
  } else {
    res.status(403).send();
  }
});

// Add a new User
router.route('/users').post(UserController.addUser);

// Change User
router.route('/users/:cuid').put(passport.authenticate('jwt', {session: false}), (req, res) => {

    let userFromJWT = req.user.cuid;

    console.log('hello'.green); // outputs green text

    if(req.params.cuid === userFromJWT)
    {
        console.log('hello2'.green); // outputs green text

        UserController.changeUser(req, res);
    } else {
      res.status(403).end();
    }
});

//Login a User
router.route('/login').post(
    passport.authenticate('json', {session: false, failureRedirect: '/api/failedlogin'}),
    function (req, res) {
        let userForJWT = req.user;

        userForJWT['password_digest'] = ''; //remove password from JWT (obvious why)
        userForJWT['avatar'] = ''; //remove avatar from JWT to decrease token size
        const jwtClaim = JSON.stringify(userForJWT);
        var token = jwt.sign(jwtClaim, config.secret);

        res.json({loginSuccess: true, user: userForJWT, token: 'JWT ' + token});
    }
);

router.route('/failedLogin').get((req, res) => {
    res.status(403).end();
});

// Delete a post by cuid
router.route('/users/:cuid').delete(passport.authenticate('jwt', {session: false}), (req, res) => {
    let userFromJWT = req.user.cuid;

    if(req.params.cuid === userFromJWT)
    {
        UserController.deleteUser(req, res);
    } else {
      res.status(403).end();
    }
});

// get Messages from a user
router.route('/chatMessages/:cuid').get(passport.authenticate('jwt', {session: false}), (req, res) => {
    UserController.getMessages(req, res);
});

// get Messages from a user
router.route('/chatMessages').post(UserController.saveMessage);

export default router;
