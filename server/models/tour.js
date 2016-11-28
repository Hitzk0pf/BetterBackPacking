var bcrypt = require('bcrypt');
var cuid = require('cuid');

const TourModel = (sequelize, Sequelize) => {
  const Tour = sequelize.define('tour', {
        cuid: {
                type: Sequelize.STRING,
                primaryKey: true,
                validate: {
                        notEmpty: true,
                }
        },
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		}
	},
	location: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		}
	},
	duration: {
		type: Sequelize.FLOAT,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull: false,
		validate: {
			notEmpty: true,
		}
	}
  }, {
	tableName: 'tours',
	freezeTableName: true,
  });

  Tour.sync({force: true}).then(function () {
    // Testtour at serverstart
    return Tour.create({
      cuid: cuid(),
      description: 'From Mumbai to Delhi',
      location: 'Mumbai',
      duration: '20',
      price: '5000',
    });
  });

  return Tour;
}

export default TourModel;
