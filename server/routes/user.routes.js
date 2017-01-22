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

// get all guides
// Get one post by cuid
router.route('/users/:cuid').get(UserController.getUser);

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
    }

    res.json({authenticationSuccess: true, authenticatedUser: userFromJWT});
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
router.route('/users/:cuid').delete(UserController.deleteUser);

export default router;
