'use strict';

const co = require('co');
const router = require('koa-router')();

const db = require('../../migrations/models');
const fs = require('fs');
const path = require('path');
const basename  = path.basename(module.filename);

module.exports = function(app){

    //services
    let services = {};

    fs
        .readdirSync(__dirname)
        .filter((file)=>{
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) !== '.js');
        })
        .forEach((file)=>{
            const service = require(path.join(__dirname, file));
            services[file] = service(db.models);
            const baseUri = ['auth'].indexOf(file) > -1 ? '' : '/api';
            router.use(baseUri, services[file].routes(), services[file].allowedMethods());
        });

    console.log('init services', Object.keys(services));

    //设置关联
    const models = db.models;
    Object.keys(models)
        .map(name => models[name])
        .filter(model => model.associate)
        .forEach(model => model.associate(models));

    db.sequelize.sync();

    app.use((function(sequelize, services){
        return co.wrap(function *(ctx, next) {
            ctx.sequelize = sequelize;
            ctx.services = services;
            yield next();
        });
    })(db.sequelize, services));
    
    app.use(router.routes());
    app.use(router.allowedMethods());
};