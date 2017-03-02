'use strict';

const getModels = require('./models');
const service = require('../../utils').service;
const Router = require('koa-router');

module.exports = function(sequelize){
    const models = getModels(sequelize);
    const router = new Router({prefix: '/users'});
    service(router, { model: models.users });

    return router;
};