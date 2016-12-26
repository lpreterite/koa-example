'use strict';

const co = require('co');
const router = require('koa-router')();
const Sequelize = require('sequelize');

// services
const userService = require('./user');

module.exports = function(app){
    return co.wrap(function *(ctx, next){
        //创建连接
        const sequelize = ctx.sequelize = new Sequelize(ctx.config.get('db.mysql'), {
            dialect: 'mysql',
            logging: false
        });

        //services
        ctx.services = {
            users: userService(sequelize)
        };

        Object.keys(ctx.services).forEach(name => {
            const service = ctx.services[name];
            router.use('/api', service.routes(), service.allowedMethods());
        });

        //设置关联
        const models = sequelize.models;
        Object.keys(models)
            .map(name => models[name])
            .filter(model => model.associate)
            .forEach(model => model.associate(models));

        sequelize.sync();

        app.use(router.routes());
        app.use(router.allowedMethods());

        yield next();
    });
};