import models from '../models/index'
import config from '../config';
let cuid = require('cuid');
let colors = require('colors');
let FB = require('fb');

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
          if(user.facebook_id) {
            done(null, user);
          } else {
            done(null, user);
          }
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
      callbackURL: "http://localhost:8000/api/login/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      //console.log(JSON.parse(JSON.stringify(profile.birthday)));
      console.log(colors.green(accessToken));

      let user = {};

      //call FB api to get user info
      FB.setAccessToken(accessToken);
      FB.api('/me', { fields: ['id', 'name', 'email', 'birthday', 'first_name', 'last_name'] }, function (res) {
        if(!res || res.error) {
          console.log(!res ? 'error occurred' : res.error);
          return;
        }

        user.cuid = cuid();
        user.firstname = res.first_name;
        user.lastname = res.last_name;
        user.birthdate = res.birthday;
        user.email = res.email;
        user.missingAttributes = true;
        user.password = "";
        user.password_confirmation = "";

        models.User
          .findOrCreate({where: {facebook_id: profile.id}, defaults: {...user}})
          .spread(function(user, created) {
            console.log(user.get({
              plain: true
            }))
            console.log(created)
            return cb(null, user);
        })

      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
}
