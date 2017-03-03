'use strict';

const service = require('../../utils').service;
const hooks = require('./hooks');
const Router = require('koa-router');

module.exports = function(models){
    const router = new Router({prefix: '/users'});
    service(router, hooks, { model: models.users });

    return router;
};