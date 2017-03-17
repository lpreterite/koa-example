'use strict';
module.exports = function(sequelize, DataTypes) {
  const taxonomy = sequelize.define('taxonomy', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taxonomy: DataTypes.STRING, //tag、category、topic
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models){
        taxonomy.belongsTo(models.term, {as: 'term'});
      }
    },
    freezeTableName: true,
    timestamps: true, //add createAt and updateAt
    paranoid: true, // add destroy handle
  });
  return taxonomy;
};