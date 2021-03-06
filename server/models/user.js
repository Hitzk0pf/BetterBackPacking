var bcrypt = require('bcrypt');
var cuid = require('cuid');
import models from '../models/index';

const UserModel = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        cuid: {
            type: Sequelize.STRING,
            primaryKey: true,
            validate: {
                notEmpty: true,
            }
        },
	facebook_id: {
		type: Sequelize.BIGINT,
		allowNull: true,
	},
  avatar: {
      type: Sequelize.BLOB,
      allowNull: true,
      /*
       validate: {
       notEmpty: true
       }
       */
  },
	firstname: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	lastname: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	isGuide: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
    allowNull: false,
	},
	last_seen: {
		type: Sequelize.DATE,
		allowNull: false,
    defaultValue: new Date(),
	},
	birthdate: {
		type: Sequelize.DATE,
		allowNull: true,
	},
	email: {
		type: Sequelize.STRING,
                unique: true,
		allowNull: true,
	},
	password_digest: {
		type: Sequelize.STRING,
	},
	password: {
		type: Sequelize.VIRTUAL,
		allowNull: true,
	},
	password_confirmation: {
		type: Sequelize.VIRTUAL
	},
  }, {
	tableName: 'users',
	freezeTableName: true,
	indexes: [{unique: true, fields: ['email']}],
	instanceMethods: {
		authenticate: function(value) {
			if (bcrypt.compareSync(value, this.password_digest))
				return this;
			else
				return false;
		}
	}
  });

    let hasSecurePassword = function (user, options, callback) {
        if (user.password != user.password_confirmation) {
            throw new Error("Password confirmation doesn't match Password");
        }

        //hash pw with 10 iterations
        bcrypt.hash(user.get('password'), 10, function (err, hash) {
            if (err) return callback(err);
            user.set('password_digest', hash);
            return callback(null, options);
        });
    };

  User.beforeCreate(function(user, options, callback) {
          if(user.email) {
            user.email = user.email.toLowerCase();
          }

          if (!user.cuid) {
            user.cuid = cuid();
          }

          if (user.password)
              hasSecurePassword(user, options, callback);
          else
              return callback(null, options);
    });

    User.beforeUpdate(function (user, options, callback) {
        user.email = user.email.toLowerCase();
        if (user.password)
            hasSecurePassword(user, options, callback);
        else
            return callback(null, options);
    });

  // User.sync({force: true}).then(function () {
  //     // Table created, add a test user when the server starts
  //     return User.create({
  //         //cuid: cuid(),
  //         cuid: '123',
  //         firstname: 'John',
  //         lastname: 'Hancock',
  //         email: 'hancock@gmail.com',
  //         password: 'plain1234',
  //         password_confirmation: 'plain1234',
  //         avatar: null,
  //         birthdate: new Date(1980, 6, 20),
  //         isGuide: true
  //     });
  // });

    return User;
}

export default UserModel;
