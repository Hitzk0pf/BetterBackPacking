import cuid from 'cuid'

var Sequelize = require("sequelize");

//mysql: var sequelize = new Sequelize("BBP", "root", "root");

//postgresql:
//change username and pw
var sequelize = new Sequelize('postgres://root:root@localhost:5432/bbp');

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

// import models - add new models if existing
var User = sequelize.import('./user.js');
var Tour = sequelize.import('./tour.js');
var Group = sequelize.import('./group.js');
var GuideInfo = sequelize.import('./guideInfo.js');

  User.sync({force: true}).then(function () {
      // Table created, add a test user when the server starts

    const newUser = {};

    //only pick wanted attributes
    newUser.cuid = cuid();
    newUser.firstname = 'Max';
    newUser.lastname = 'Muser';
    newUser.email = 'max.muster@gmail.com';
    newUser.password = 'plain1234';
    newUser.password_confirmation = 'plain1234';
    newUser.avatar = null;
    newUser.birthdate = new Date(1980, 6, 20);
    newUser.isGuide = true;

    User.create({...newUser});

    newUser.cuid = '123';
    newUser.firstname = 'John';
    newUser.lastname = 'Hancock';
    newUser.email = 'hancock@gmail.com';
    newUser.password = 'plain1234';
    newUser.password_confirmation = 'plain1234';
    newUser.avatar = null;
    newUser.birthdate = new Date(1920, 6, 20);
    newUser.isGuide = true;

    User.create({...newUser});

    newUser.cuid = cuid();
    newUser.firstname = 'Hai';
    newUser.lastname = 'Dang';
    newUser.email = 'schwuchtel@gmail.com';
    newUser.password = 'plain1234';
    newUser.password_confirmation = 'plain1234';
    newUser.avatar = null;
    newUser.birthdate = new Date(1990, 6, 20);
    newUser.isGuide = true;

    User.create({...newUser});

    return true
  }).then(() => {

    GuideInfo.belongsTo(User);
    //GuideInfo.sync()

    GuideInfo.sync({force: true}).then(function () {
      // Testtour at serverstart
      return GuideInfo.create({
        cuid: cuid(),
        description: 'I am so and so old...',
        characterTraits: ['Adventurous', 'Open-Minded', 'Funny'],
        characterTraitDescription: ['I love adventures!', 'I think Open-Minded.', 'I am the funniest guy you will ever meet.'],
        userCuid: '123'
      });
    });

  });

var db   = {
	User,
	Tour,
	Group,
  GuideInfo,
};


db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
