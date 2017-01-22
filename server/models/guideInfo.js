var bcrypt = require('bcrypt');
var cuid = require('cuid');

const GuideInfoModel = (sequelize, Sequelize) => {
  const GuideInfo = sequelize.define('guideInfo', {

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
  	characterTraits: {
  		type: Sequelize.ARRAY(Sequelize.STRING),
  		allowNull: false,
  		validate: {
  			notEmpty: true,
  		}
  	},
  	characterTraitDescription: {
  		type: Sequelize.ARRAY(Sequelize.STRING),
  		allowNull: false,
  		validate: {
  			notEmpty: true,
  		}
  	}
    }, {
  	tableName: 'guideInfos',
  	freezeTableName: true,
    });

  /*GuideInfo.sync({force: true}).then(function () {
    // Testtour at serverstart
    return Tour.create({
      cuid: cuid(),
      description: 'I am so and so old...',
    });
  });*/

  return GuideInfo;
}

export default GuideInfoModel;
