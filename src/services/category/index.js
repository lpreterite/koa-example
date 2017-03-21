'use strict';

const service = require('koa-sequelize-restful');
const hooks = require('./hooks');
const Router = require('koa-router');

module.exports = function(models){
    const router = new Router({prefix: '/category'});
    service(router, { model: models.taxonomy }, hooks);
    
    return router;
};