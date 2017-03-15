'use strict';

const service = require('koa-sequelize-restful');
const hooks = require('./hooks');
const Router = require('koa-router');

module.exports = function(models){
    const router = new Router({prefix: '/post'});
    service(router, { model: models.post }, hooks);

    return router;
};