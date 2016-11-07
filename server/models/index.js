var Sequelize = require("sequelize");

var sequelize = new Sequelize("BBP", "root", "root");

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
