var bcrypt = require('bcrypt');
var cuid = require('cuid');

const GroupModel = (sequelize, Sequelize) => {
    const Group = sequelize.define('user', {
        cuid: {
            type: Sequelize.STRING,
            primaryKey: true,
            validate: {
                notEmpty: true,
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
    }, {
        tableName: 'groups',
        freezeTableName: true,
        indexes: [],
        instanceMethods: {}
    });


    Group.sync({force: true}).then(function () {
        return Group.create({
            cuid: cuid(),
            name: 'BackPacker',
        });
    }).then(function () {
        return Group.create({
            cuid: cuid(),
            name: 'Guide',
        });
    });

    return Group;

};

export default GroupModel;
