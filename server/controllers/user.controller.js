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
  let failed = false
  if (!req.body.user.firstname || !req.body.user.lastname || !req.body.user.email || !req.body.user.birthdate || req.body.user.isGuide === null) {
    res.status(403).end();
    failed = true
  } else if(!req.body.user.password || !req.body.user.password_confirmation) {
      if(!req.body.user.facebook_id) {
        res.status(403).end();
        failed = true
      }
  }

  if(!failed) {
      const requestUser = req.body.user;
      const newUser = {};

      console.log('AVATAR', req.body.user.avatar)

      //only pick out attributes that we want (who knows what attributes a hacker sends to our api endpoints)
      newUser.cuid = cuid();
      newUser.firstname = requestUser.firstname;
      newUser.lastname = requestUser.lastname;
      newUser.email = requestUser.email;
      newUser.isGuide = requestUser.isGuide;
      if (requestUser.avatar === true && requestUser.facebook_id) {
        newUser.avatar = "graph.facebook.com/" + requestUser.facebook_id + "/picture?height=500&width=500"
      } else if (requestUser.avatar) {
        newUser.avatar = requestUser.avatar;
      }
      newUser.birthdate = requestUser.birthdate;
      if(!req.body.user.facebook_id) {
        newUser.password = requestUser.password;
        newUser.password_confirmation = requestUser.password_confirmation;
      } else {
        newUser.password = "";
        newUser.password_confirmation = "";
        newUser.facebook_id = requestUser.facebook_id;
      }

      console.log("userCreate: ", newUser);

      models.User.create({...newUser}).then(user => {
        res.json({ user });
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
      user['password_digest'] = ""
      
      if(user['avatar']) {
        user['avatar'] = user['avatar'].toString()
      }

      res.json({user});
    } else {
      res.status(404).send();
    }
  }).catch(err => res.status(500).send(err));

}

/**
 * Change a User
 * @param req
 * @param res
 * @returns void
 */
export function changeUser(req, res) {
  let failed = false
    models.User.findOne({ where: { cuid: req.params.cuid } }).then((user) => {
            if (user) {
                //edit user
                const requestUser = req.body.user;

                const updatedUser = {};

                if (requestUser.firstname) {
                    updatedUser.firstname = requestUser.firstname;
                }

                if (requestUser.lastname) {
                    updatedUser.lastname = requestUser.lastname;
                }

                if (requestUser.isGuide) {
                    updatedUser.isGuide = requestUser.isGuide;
                }

                if (requestUser.birthdate) {
                    updatedUser.birthdate = requestUser.birthdate;
                }

                if (requestUser.email) {
                    updatedUser.email = requestUser.email;
                }

                if (requestUser.avatar === true && requestUser.facebook_id) {
                  updatedUser.avatar = "graph.facebook.com/" + requestUser.facebook_id + "/picture?height=500&width=500"
                } else if (requestUser.avatar) {
                  updatedUser.avatar = requestUser.avatar;
                }

                if(!req.body.user.facebook_id) {
                  updatedUser.password = requestUser.password;
                  updatedUser.password_confirmation = requestUser.password_confirmation;
                } else {
                  updatedUser.password = "";
                  updatedUser.password_confirmation = "";
                  updatedUser.facebook_id = requestUser.facebook_id;
                }



                user.update({...updatedUser }).then(user => {
                    res.json({ user });
                }).catch(err => {
                    failed = 500;
                });

                failed = false;
            } else {
                failed = true;
            }

            if (failed) {
                if (failed === 500) {
                    res.status(500).send();
                } else {
                    res.status(404).send();
                }
            }
        });

    }


export function deleteUser(req, res) {

  models.User.findOne({ where: {cuid: req.params.cuid} }).then((user) => {
    if(user) {
      user.destroy();
      res.status(200).end();
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
 /*
export function deleteUser(req, res) {
  models.User.findOne({ cuid: req.params.cuid }).exec((err, User) => {
    if (err) {
      res.status(500).send(err);
    }

    User.remove(() => {
      res.status(200).end();
    });
  });
}*/
