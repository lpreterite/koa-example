'use strict';

const co = require('co');
const convert = require('koa-convert');
const Sequelize = require('sequelize');
const Restful = require('./restful');

//设置
exports.orm = function(setting){
    return co.wrap(function *(ctx, next){
        ctx.sequelize = new Sequelize(setting, {
            dialect: 'mysql',
            logging: false
        });
        yield next();
    });
};

//同步数据库
exports.associate = function(){
    return co.wrap(function *(ctx, next){
        const sequelize = ctx.sequelize;
        const models = sequelize.models;
        Object.keys(models)
            .map(name => models[name])
            .filter(model => model.associate)
            .forEach(model => model.associate(models));

        sequelize.sync();

        yield next();
    });
};

//生成restful路由
exports.service = function(router, opts){
    opts = opts || {};

    const restful = new Restful(opts);

    router
        .get('/', convert(restful.find()))
        .get('/:id', convert(restful.get()))
        .post('/', convert(restful.create()))
        .put('/:id', convert(restful.update()))
        .patch('/:id', convert(restful.patch()))
        .del('/:id', convert(restful.del()));
    return router;
};