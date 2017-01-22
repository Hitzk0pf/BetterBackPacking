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
	},
	lenght: {
		type: Sequelize.FLOAT,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	extra: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	standard: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	food: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	accommodation: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	fitnessLevel: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	teamSize: {
		type: Sequelize.FLOAT,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	sanitary: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	electricity: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	transportation: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
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
      duration: 20,
      price: 5000,
      lenght: 555,
      extra: 'All Inclusive',
      standard: 'Clean',
      food: 'Asian',
      accommodation: 'Hotel',
      fitnessLevel: 'American',
      teamSize: 10,
      sanitary: 'Bathroom',
      electricity: 'TV, Wifi',
      transportation: 'Car,Train',
    });
  });

  return Tour;
}

export default TourModel;
