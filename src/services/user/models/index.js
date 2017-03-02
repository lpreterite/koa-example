'use strict';

var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(module.filename);

module.exports = function(sequelize){
    let modules = {};
    fs
      .readdirSync(__dirname)
      .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
      })
      .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname, file));
        modules[model.name] = model;
      });
    return modules;
};