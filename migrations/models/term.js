'use strict';
module.exports = function(sequelize, DataTypes) {
  const terms = sequelize.define('term', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alias: {
      type: DataTypes.STRING
    },
    description: DataTypes.TEXT,
    parentId: {
      type: DataTypes.INTEGER
    },
    level: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models){
        terms.belongsTo(models.term, {as: 'parent'});
      }
    },
    freezeTableName: true,
    timestamps: true, //add createAt and updateAt
  });
  return term;
};