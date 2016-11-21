import models from '../models/index'
import config from '../config';
let colors = require('colors');

//Login User
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var JsonStrategy = require('passport-json').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function(passport) {

  passport.use(new JsonStrategy(
    {
      usernameProp: 'email',
      passwordProp: 'password'
    },

    function(username, password, done) {
      console.log(colors.green('hello'));
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

  passport.use(new FacebookStrategy({
      clientID: "690372471129415",
      clientSecret: "c9f794ac0617a347a89921af263db4ba",
      callbackURL: "http://localhost:8000/api/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      models.User.findOrCreate({ where: {facebookId: profile.id} }).then(user => {
        return cb(null, user);
      }).catch(err => { return cb(err, null); });
    }
  ));
}
