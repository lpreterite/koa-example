'use strict';
module.exports = function(sequelize, DataTypes) {
  const term_mapping = sequelize.define('term_mapping', {
    name: DataTypes.STRING,
    principalId: {
      type: DataTypes.INTEGER
    },
    termId: {
      type: DataTypes.INTEGER
    },
    taxonomy: DataTypes.STRING, //tag、category、topic
    target: DataTypes.STRING, //posts、medias
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    classMethods: {
      associate: function(models){
        term_mapping.belongsTo(models.term, {as: 'term'});
      }
    },
    freezeTableName: true,
    timestamps: true, //add createAt and updateAt
    paranoid: true, // add destroy handle
  });
  return term_mapping;
};