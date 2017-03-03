'use strict';

const co = require('co');
const router = require('koa-router')();
const home = require('./home.js');
const test = require('./test.js');

module.exports = function(app){
    router.use('/', home.routes(), home.allowedMethods());
    router.use('/test', test.routes(), test.allowedMethods());
    app.use(router.routes());
    app.use(router.allowedMethods());
};