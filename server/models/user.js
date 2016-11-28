var bcrypt = require('bcrypt');
var cuid = require('cuid');

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
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 50]
            }
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 50]
            }
        },
        birthdate: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true,
                len: [1, 255]
            }
        },
        password_digest: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: Sequelize.VIRTUAL,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [6, Infinity]
            }
        },
        password_confirmation: {
            type: Sequelize.VIRTUAL
        }
    }, {
        tableName: 'users',
        freezeTableName: true,
        indexes: [{unique: true, fields: ['email']}],
        instanceMethods: {
            authenticate: function (value) {
                if (bcrypt.compareSync(value, this.password_digest))
                    return this;
                else
                    return false;
            }
        }
    });

    var hasSecurePassword = function (user, options, callback) {
        if (user.password != user.password_confirmation) {
            throw new Error("Password confirmation doesn't match Password");
        }

        //hash pw with 16 iterations
        bcrypt.hash(user.get('password'), 10, function (err, hash) {
            if (err) return callback(err);
            user.set('password_digest', hash);
            return callback(null, options);
        });
    };

    User.beforeCreate(function (user, options, callback) {
        user.email = user.email.toLowerCase();
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

    User.sync({force: true}).then(function () {
        // Table created, add a test user when the server starts
        return User.create({
            cuid: cuid(),
            firstname: 'John',
            lastname: 'Hancock',
            email: 'hancock@gmail.com',
            password: 'plain1234',
            password_confirmation: 'plain1234',
            birthdate: new Date(1980, 6, 20),
        });
    });

    return User;
}

export default UserModel;
