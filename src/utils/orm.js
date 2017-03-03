'use strict';

const co = require('co');
const compose = require('koa-convert').compose;
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
        .get('/', compose(actions.find))
        .get('/:id', compose(actions.get))
        .post('/', compose(actions.create))
        .put('/:id', compose(actions.update))
        .patch('/:id', compose(actions.patch))
        .del('/:id', compose(actions.remove));
    return router;
};