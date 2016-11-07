const UserModel = (sequelize, Sequelize) => {
	var User = sequelize.define('user', {
	  firstName: {
	    type: Sequelize.STRING
	  },
	  lastName: {
	    type: Sequelize.STRING
	  }
	});

	// force: true will drop the table if it already exists
	User.sync().then(function () {
	  // Table created
	  return User.create({
	    firstName: 'John',
	    lastName: 'Hancock'
	  });
	});

	return User;
}

export default UserModel;
