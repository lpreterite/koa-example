'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
    const user = sequelize.define('users', {
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        nicename: Sequelize.STRING(36),
        username: {
          type: Sequelize.STRING(36),
          allowNull: false,
          unique: true,
        },
        roles: Sequelize.STRING
    }, {
        classMethods: {
          associate: function(models){
            // user.hasMany(models.user_meta, {as: 'meta', 'foreignKey': 'uid'});
          }
        },
        freezeTableName: true,
        timestamps: true, //add createAt and updateAt
        paranoid: true, // add destroy handle
        createdAt: 'registeredAt',
        deletedAt: 'freezedAt'
    });
    return user;
};