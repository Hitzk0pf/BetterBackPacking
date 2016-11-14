import models from '../models/index'
import config from '../config';

//Login User
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var JsonStrategy = require('passport-json').Strategy;

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(passport) {

  passport.use(new JsonStrategy(
    {
      usernameProp: 'email',
      passwordProp: 'password'
    },

    function(username, password, done) {
      models.User.findOne({ where: {email: username} }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
    
  ));

  var opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      models.User.findOne({ where: {cuid: jwt_payload.cuid} }).then(user => {
        if(user) {
          done(null, user);
        } else {
          done(null, false);
        }
      }).catch(err => {
        if(err) {
          done(err, false);
        }
      });
  }));
}
