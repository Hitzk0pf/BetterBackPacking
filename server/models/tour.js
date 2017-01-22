
import models from '../models/index';
import Tour from '../models/tour';

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

    const newTour = {};

    //only pick wanted attributes
    newTour.cuid = cuid();
    newTour.description = 'Delhi City Tour';
    newTour.location = 'Delhi';
    newTour.duration = 1;
    newTour.price = 2000;
    newTour.lenght = 75;
    newTour.extra = 'Breakfast included';
    newTour.standard = 'Clean';
    newTour.food = 'Indian';
    newTour.accommodation = 'Motel';
    newTour.fitnessLevel = 'Average';
    newTour.teamSize = 4;
    newTour.sanitary = 'WC';
    newTour.electricity = 'Wifi';
    newTour.transportation = 'Aircraft';

    models.Tour.create({...newTour});



    newTour.cuid = cuid();
    newTour.description = 'Exploring Ahmedabad';
    newTour.location = 'Ahmedabad';
    newTour.duration = 3;
    newTour.price = 4000;
    newTour.lenght = 365;
    newTour.extra = 'Half board included';
    newTour.standard = 'High Standards';
    newTour.food = 'Asian';
    newTour.accommodation = 'Hotel';
    newTour.fitnessLevel = 'Sporting';
    newTour.teamSize = 20;
    newTour.sanitary = 'WC,Shower';
    newTour.electricity = 'TV, Air Conditioning, Wifi';
    newTour.transportation = 'Car, Train';

    models.Tour.create({...newTour});


    newTour.cuid = cuid();
    newTour.description = 'Golden Triangle India Tour';
    newTour.location = 'Udaipur';
    newTour.duration = 9;
    newTour.price = 999;
    newTour.lenght = 400;
    newTour.extra = 'All inclusive';
    newTour.standard = 'Moderate Standards';
    newTour.food = 'International';
    newTour.accommodation = 'Motel';
    newTour.fitnessLevel = 'Average';
    newTour.teamSize = 3;
    newTour.sanitary = 'WC, Shower';
    newTour.electricity = 'not available';
    newTour.transportation = 'Car';

    models.Tour.create({...newTour});


    newTour.cuid = cuid();
    newTour.description = 'Taj Express';
    newTour.location = 'New Delhi';
    newTour.duration = 8;
    newTour.price = 1024;
    newTour.lenght = 350;
    newTour.extra = 'Free drinks xD';
    newTour.standard = 'Low Standards';
    newTour.food = 'Indian';
    newTour.accommodation = 'Motel';
    newTour.fitnessLevel = 'Couch potato';
    newTour.teamSize = 17;
    newTour.sanitary = 'WC';
    newTour.electricity = 'TV';
    newTour.transportation = 'Train';

    models.Tour.create({...newTour});


    newTour.cuid = cuid();
    newTour.description = 'Incredible India ';
    newTour.location = 'Kolkata';
    newTour.duration = 4;
    newTour.price = 500;
    newTour.lenght = 95;
    newTour.extra = 'Free Drink on arrival :)';
    newTour.standard = 'Moderate Standards';
    newTour.food = 'Asian';
    newTour.accommodation = 'Motel';
    newTour.fitnessLevel = 'Couch potato';
    newTour.teamSize = 15;
    newTour.sanitary = 'WC,Bathroom';
    newTour.electricity = 'Air Conditioning, Wifi,';
    newTour.transportation = 'Car';

    models.Tour.create({...newTour});


    newTour.cuid = cuid();
    newTour.description = 'Real Food Adventure - India';
    newTour.location = 'Goa';
    newTour.duration = 15;
    newTour.price = 1400;
    newTour.lenght = 200;
    newTour.extra = 'All Inclusive';
    newTour.standard = 'High Standards';
    newTour.food = 'Indian';
    newTour.accommodation = 'Hotel';
    newTour.fitnessLevel = 'Couch potato';
    newTour.teamSize = 30;
    newTour.sanitary = 'WC, Bathroom';
    newTour.electricity = 'Wifi, TV';
    newTour.transportation = 'Bus';

    models.Tour.create({...newTour});


    newTour.cuid = cuid();
    newTour.description = 'Southern India';
    newTour.location = 'Kochi';
    newTour.duration = 15
    newTour.price = 1112;
    newTour.lenght = 4000;
    newTour.extra = 'Breakfast included';
    newTour.standard = 'Moderate Standards';
    newTour.food = 'International';
    newTour.accommodation = 'Motel';
    newTour.fitnessLevel = 'Sporting';
    newTour.teamSize = 12;
    newTour.sanitary = 'WC';
    newTour.electricity = 'Wifi';
    newTour.transportation = 'Car, Bus';

    models.Tour.create({...newTour});


    newTour.cuid = cuid();
    newTour.description = 'Rajasthan Experience';
    newTour.location = 'New Delhi';
    newTour.duration = 12;
    newTour.price = 500;
    newTour.lenght = 225;
    newTour.extra = 'Dinner included';
    newTour.standard = 'High Standards';
    newTour.food = 'Indian';
    newTour.accommodation = 'Hotel';
    newTour.fitnessLevel = 'Average';
    newTour.teamSize = 18;
    newTour.sanitary = 'WC, Bathroom';
    newTour.electricity = 'Air Conditioning';
    newTour.transportation = 'Car, Train';

    models.Tour.create({...newTour});


    newTour.cuid = cuid();
    newTour.description = 'Unforgettable India';
    newTour.location = 'Hyderabad';
    newTour.duration = 4;
    newTour.price = 250;
    newTour.lenght = 60;
    newTour.extra = 'Breakfast included';
    newTour.standard = 'Moderate Standards';
    newTour.food = 'Indian';
    newTour.accommodation = 'Motel';
    newTour.fitnessLevel = 'Couch potato';
    newTour.teamSize = 4;
    newTour.sanitary = 'WC, Bathroom';
    newTour.electricity = 'Wifi';
    newTour.transportation = 'Train';

    models.Tour.create({...newTour});


    newTour.cuid = cuid();
    newTour.description = 'From Mumbai to Delhi';
    newTour.location = 'Mumbai';
    newTour.duration = 20;
    newTour.price = 5000;
    newTour.lenght = 555;
    newTour.extra = 'All Inclusive';
    newTour.standard = 'High Standards';
    newTour.food = 'Asian';
    newTour.accommodation = 'Hotel';
    newTour.fitnessLevel = 'Average';
    newTour.teamSize = 10;
    newTour.sanitary = 'Bathroom, Shower';
    newTour.electricity = 'TV, Wifi';
    newTour.transportation = 'Car, Train';

    models.Tour.create({...newTour});


  });

  return Tour;
  

}

export default TourModel;
