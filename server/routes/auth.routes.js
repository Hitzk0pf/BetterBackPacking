import { Router } from 'express';
import config from '../config';

var passport = require('passport');
var jwt = require('jsonwebtoken');

const router = new Router();

router.route('/api/login/facebook').get(passport.authenticate('facebook', { scope: ['email', 'user_birthday'] }));
router.route('/api/login/facebook/callback').get(
      passport.authenticate('facebook', { failureRedirect: '/api/login' }),
      function(req, res) {
        let userForJWT = req.user;
        console.log("user:", req.user);

        userForJWT['password_digest'] = ''; //remove password from JWT (obvious why)
        userForJWT['password'] = ''; //remove password from JWT (obvious why)
        userForJWT['password_confirmation'] = ''; //remove password from JWT (obvious why)
        const jwtClaim = JSON.stringify(userForJWT);
        var token = jwt.sign(jwtClaim, config.secret);
        // Successful authentication, redirect to completeFBLogin.
        token = 'JWT ' + token;

        let user = req.user.dataValues;

        for (let attr in user) {
            if (user.hasOwnProperty(attr)) {
              console.log("attr", user[attr]);
              if(!user[attr]) {
                  token = token + "," + attr;
              }
            }
        }

        let uriToken = encodeURIComponent(token);

        res.redirect('/fbLogin/' + uriToken);
      }
);


export default router;
