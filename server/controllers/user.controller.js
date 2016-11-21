import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import models from '../models/index';

/**
 * Get all User
 * @param req
 * @param res
 * @returns void
 */
export function getUsers(req, res) {
    models.User.findAll().then((users) => {
      console.log("SUCCESS", users);
      res.json(users);
    }).catch((err) => {
      console.log("FUCKED UP", err);
    });

}

/**
 * Save a User
 * @param req
 * @param res
 * @returns void
 */
export function addUser(req, res) {
  if (!req.body.user.firstname || !req.body.user.lastname || !req.body.user.email || !req.body.user.password || !req.body.user.password_confirmation || !req.body.user.birthdate) {
    res.status(403).end();
  }
  else
  {
    const requestUser = req.body.user;
    const newUser = {};

    //only pick out attributes that we want (who knows what attributes a hacker sends to our api endpoints) 
    newUser.cuid = cuid();
    newUser.firstname = requestUser.firstname;
    newUser.lastname = requestUser.lastname;
    newUser.email = requestUser.email;
    newUser.birthdate = requestUser.birthdate;
    newUser.password = requestUser.password;
    newUser.password_confirmation = requestUser.password_confirmation;
    
    console.log("userCreate: ", newUser);

    models.User.create({...newUser}).then(user => {
      res.json({ User: user });
    }).catch(err => {
        res.status(500).send(err);
    });
  }
}

/**
 * Get a single User
 * @param req
 * @param res
 * @returns void
 */
export function getUser(req, res) {

  models.User.findOne({ where: {cuid: req.params.cuid} }).then((user) => {
    if(user) {
      res.json({user});
    } else {
      res.status(404).send();
    }
  }).catch(err => res.status(500).send(err));

}

/**
 * Delete a User
 * @param req
 * @param res
 * @returns void
 */
export function deleteUser(req, res) {
  User.findOne({ cuid: req.params.cuid }).exec((err, User) => {
    if (err) {
      res.status(500).send(err);
    }

    User.remove(() => {
      res.status(200).end();
    });
  });
}
