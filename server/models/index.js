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
var db        = {
	User,
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
