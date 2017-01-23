import models from '../models/index';
import GuideInfo from '../models/guideInfo';
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

  GuideInfo.sync({force: true}).then(function () {
    // Testtour at serverstart
    const newGuideInfo = {};

    //only pick wanted attributes
    newGuideInfo.cuid = cuid();
    newGuideInfo.description = 'Blablabla';
    newGuideInfo.characterTraits = ['Adventurous', 'Open-Minded', 'Funny'];
    newGuideInfo.characterTraitDescription = ['I love adventures!', 'I think Open-Minded.', 'I am the funniest guy you will ever meet.'];

    models.GuideInfo.create({...newGuideInfo});


  });

  return GuideInfo;
}

export default GuideInfoModel;
