import { Router } from 'express';
import config from '../config';

var passport = require('passport');
var jwt = require('jsonwebtoken');

const router = new Router();

router.route('/api/login/facebook').get(passport.authenticate('facebook', { scope: ['email', 'user_birthday'] }));
router.route('/api/login/facebook/callback').get(
      passport.authenticate('facebook', { failureRedirect: '/api/login' }),
      function(req, res) {
        console.log("user:", req.user);

        delete req.user.password;
        delete req.user.password_digest;
        delete req.user.password_confirmation;
        let userForJWT = req.user;


        const jwtClaim = JSON.stringify(userForJWT);
        var token = jwt.sign(jwtClaim, config.secret);
        // Successful authentication, redirect to completeFBLogin.
        token = 'JWT ' + token;

        let user = req.user;

        // compute missing attributes 
        let missingAttributes = '';
        let getQuery = '';

        console.log("req.user.dataVALUES:", user);

        for (let attr in user) {
            if (user.hasOwnProperty(attr)) {
              if(attr != "password" || attr != "password_digest" || attr != "password_confirmation") {
                console.log("attr", user[attr]);
                if(!user[attr]) {
                    if(!missingAttributes) {
                      missingAttributes = attr;
                    } else {
                      missingAttributes = missingAttributes + "," + attr;
                    }
                } else {
                  if(!getQuery) {
                    getQuery = '?' + attr + '=' + encodeURIComponent(user[attr]);
                  } else {
                    getQuery = getQuery + '&' + attr + '=' +  encodeURIComponent(user[attr]);
                  }
                }
              }
            }
        }


        if(!missingAttributes) {
          let uriToken = encodeURIComponent(token);
          getQuery = '?token=' + uriToken;
        } else {
          getQuery = getQuery + '&missingAttributes=' + missingAttributes;
        }


        res.redirect('/fbLogin' + getQuery);
      }
);


export default router;
