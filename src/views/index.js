'use strict';

const co = require('co');
const router = require('koa-router')();
const home = require('./home.js');

module.exports = function(app){
    router.use('/', home.routes(), home.allowedMethods());
    app.use(router.routes());
    app.use(router.allowedMethods());
};