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
exports.service = function(router, hooks, opts){
    opts = opts || {};

    const restful = new Restful(opts);
    let actions = {
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    };
    Object.keys(actions).forEach(function(method){
        actions[method] = [].concat(
            hooks.before.all || [],
            hooks.before[method] || [],
            restful[method](),
            hooks.after[method] || [],
            hooks.after.all || []
        );
    });

    router
        .get('/', convert.compose.apply(convert, actions.find))
        .get('/:id', convert.compose.apply(convert, actions.get))
        .post('/', convert.compose.apply(convert, actions.create))
        .put('/:id', convert.compose.apply(convert, actions.update))
        .patch('/:id', convert.compose.apply(convert, actions.patch))
        .del('/:id', convert.compose.apply(convert, actions.remove));
    return router;
};