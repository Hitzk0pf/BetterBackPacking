import models from '../models/index';
import Message from '../models/message';

var bcrypt = require('bcrypt');
var cuid = require('cuid');

const MessageModel = (sequelize, Sequelize) => {
const Message = sequelize.define('model', {
  cuid: {
          type: Sequelize.STRING,
          primaryKey: true,
          validate: {
                  notEmpty: true,
          }
  },
	message: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		}
	},
	senderCuid: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		}
	},
	receiverCuid: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		}
  }
}, {
  	tableName: 'messages',
  	freezeTableName: true,
});

  Message.sync({ force: true }).then(function () {
    let newMsg = {}

    newMsg.cuid = cuid();
    newMsg.message = 'Hi there';
    newMsg.receiverCuid = '123';
    newMsg.senderCuid = '567';

    models.Message.create({ ...newMsg });
  });

  return Message;
}

export default MessageModel;
