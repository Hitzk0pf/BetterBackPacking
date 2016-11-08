const UserModel = (sequelize, Sequelize) => {
	var User = sequelize.define('user', {
	  firstName: {
	    type: Sequelize.STRING
	  },
	  lastName: {
	    type: Sequelize.STRING
	  },
	  mail: {
	    type: Sequelize.STRING
	  },
	  password: {
	    type: Sequelize.STRING
	  },
	  birthDate: {
	    type: Sequelize.DATE
	  },
	});

	// force: true will drop the table if it already exists
	User.sync().then(function () {
	  // Table created
	  return User.create({
	    firstName: 'John',
	    lastName: 'Hancock',
	    mail: 'hancock@gmail.com',
	    password: 'plain',
	    birthDate: new Date(1980, 6, 20),
	  });
	});

	return User;
}

export default UserModel;
