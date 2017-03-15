'use strict';
module.exports = function(sequelize, DataTypes) {
  const post = sequelize.define('posts', {
    title: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    description: DataTypes.TEXT('tiny'),
    content: DataTypes.TEXT,
    isDraft: DataTypes.BOOLEAN,
    publishAt: DataTypes.DATE,
    reviewAt: DataTypes.DATE,
    order: DataTypes.INTEGER,
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models){
        post.hasMany(models.term_mapping, {
          as: 'categories',
          foreignKey: 'principalId',
          constraints: false,
          scope: {
            taxonomy: 'category',
            target: 'posts'
          }
        });
        post.hasMany(models.term_mapping, {
          as: 'tags',
          foreignKey: 'principalId',
          constraints: false,
          scope: {
            taxonomy: 'tag',
            target: 'posts'
          }
        });
      }
    },
    freezeTableName: true,
    timestamps: true, //add createAt and updateAt
    paranoid: true // add destroy handle
  });
  return post;
};