'use strict';

const co = require('co');
const userModel = require('./UserModel');
const service = require('../../utils').service;
const Router = require('koa-router');

module.exports = function(sequelize){
    const router = new Router({prefix: '/users'});
    service(router,{ model:userModel(sequelize) });

    return router;
};