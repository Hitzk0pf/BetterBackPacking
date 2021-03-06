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


      models.User.findOne({ where: {facebook_id: profile.id} }).then(function(user) {
        if(user) {
          return cb(null, user.dataValues);
        }
      });

      FB.api('/me', { fields: ['id', 'name', 'email', 'birthday', 'first_name', 'last_name', 'picture'] }, function (res) {
        if(!res || res.error) {
          console.log(!res ? 'error occurred' : res.error);
          return;
        }

        //check if user is in DB already
        //if so, immediately return the callback with its values to then form a JWT in the cb function

        console.log(colors.green(profile.id));
        let userInDB= false;

        //if not in DB already, fetch out all the data

        user.firstname = res.first_name;
        user.lastname = res.last_name;
        user.birthdate = res.birthday;
        user.email = res.email;
        //user.email = "test@gmail.com";

        if(!res.picture.data.is_silhouette) {
          // user.avatar = res.picture.data.url;
          // user.avatar = "graph.facebook.com/" + profile.id + "/picture?height=500&width=500"
          user.avatar = true
        }

        //check if all the needed attributes are in the FB profile
        let missingAttributes = false;
        for (let attr in user) {
            if (user.hasOwnProperty(attr)) {
              if(!user[attr]) {
                missingAttributes = true;
              }
            }
        }


        //if no attributes are missing, create or find user
        console.log(colors.green("userInDB", userInDB));
        if(!missingAttributes || userInDB) {
            user.cuid = cuid();
            user.password = "";
            user.password_confirmation = "";

            models.User
              .findOrCreate({where: {facebook_id: profile.id}, defaults: {...user}})
              .spread(function(user, created) {
                console.log(user.get({
                  plain: true
                }))
                console.log(created)
                return cb(null, user.dataValues);
            })
        } else {
          //if some attributes are missing, return cb
          //cb will then check for missing attributes again and redirect to a page where the user can then fill in missing info
          user.facebook_id = profile.id;
          return cb(null, user);
        }

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
