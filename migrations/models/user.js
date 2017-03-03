'use strict';
module.exports = function(sequelize, DataTypes) {
    const user = sequelize.define('users', {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        nicename: DataTypes.STRING(36),
        username: {
          type: DataTypes.STRING(36),
          allowNull: false,
          unique: true,
        },
        roles: DataTypes.STRING
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